<template>
  <div class="codemirrorbox">
    <codemirror class="h-full w-full" @ready="onCmReady" v-model="query" :options="cmOptions"></codemirror>
    <pre>{{ result }}</pre>
  </div>
</template>

<script>
import * as FQL from '../../apis/FQL.js'
// import nlp from 'compromise'
import _ from 'lodash'

import { codemirror } from 'vue-codemirror'
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/keymap/sublime.js'
import 'codemirror/addon/hint/show-hint.js'
import uniq from 'lodash.uniq'

export default {
  components: {
    codemirror: codemirror
  },
  props: {
  },
  data () {
    return {
      tables: [
        [
          'posts',
          'comments',
          'settings'
        ]
      ],
      suggestions: [
      ],
      query: `
Let’s make a data bucket and call it home_page_bucket.
Let’s make a data bucket and call it menu_page_bucket.

Go get some data from posts table, store results in home_page_bucket, and label it as latest_posts, skip 100 items and get the first 10, sort with desc order.

Go get some data from comments table, store results in home_page_bucket, and label it as latest_comments, look for postID ID 1 in it, sort with asc order.

Go get some data from settings table, store results in menu_page_bucket, and label it as menu_info_items.
`,
      result: false,

      cm: false,
      ready: false,

      cmOptions: {
        extraKeys: { 'Ctrl-Space': 'autocomplete', 'Cmd-S': () => {} },
        // codemirror options
        keyMap: 'sublime',
        tabSize: 2,
        mode: 'funQueryLanguage',
        // theme: 'chrome',
        lineWrapping: true,
        lineNumbers: true,
        line: true,
        hintOptions: {
          // customKeys: {
          //   'Arrow-Up': '',
          //   'Arrow-Down': ''
          // },
          alignWithWord: false,
          hint: this.handleWordSuggestion,
          closeOnUnfocus: true
        }
      },
      clearPITimeout: 0,
      acTimeout: 0
    }
  },
  watch: {
    query () {
      this.processFQL()
    }
  },
  mounted () {
    // this.processFQL()
  },
  methods: {
    runCore () {
      this.result = FQL.procFQL({ query: this.query })
      this.processSuggestions({ dictionary: this.result.dictionary || {} })
      this.ready = true
    },
    processFQL: _.debounce(function () {
      this.runCore()
      this.runHighlight()
    }, 1000),
    processSuggestions ({ dictionary = {} }) {
      this.suggestions = [
        ...this.tables
      ]

      let dictionaryKNs = Object.keys(dictionary)
      let getOther = ({ kn }) => dictionaryKNs
        .filter((ekn) => {
          return ekn !== kn
        })
        .filter((ekn) => {
          return dictionary[ekn].includes(dictionary[kn][0])
        })
      // forEach Word
      dictionaryKNs.forEach((kn) => {
        let other = getOther({ kn })
        if (other.length > 0) {
          this.suggestions.push([
            kn,
            ...other
          ])
        }
      })

      console.log(this.suggestions)
      // setTimeout(() => {
      //   CodeMirror.commands.autocomplete(this.cm, null, { completeSingle: true })
      // })
    },
    runHighlight () {
      this.$nextTick(() => {
        let curosr = this.cm.getCursor()
        CodeMirror.commands.autocomplete(this.cm, null, { completeSingle: true })
        CodeMirror.commands.undo(this.cm)
        CodeMirror.commands.redo(this.cm)
        this.cm.setCursor({ line: curosr.line, ch: curosr.ch })
      })
    },
    onCmReady (cm) {
      // console.log(cm)
      this.cm = cm
      cm.toggleComment = () => {
      }

      this.acTimeout = 0
      let tryOepnAC = () => {
        clearTimeout(this.acTimeout)
        this.acTimeout = setTimeout(() => {
          CodeMirror.commands.autocomplete(cm, null, { completeSingle: true })
        }, 400)
      }

      this.tryOepnAC = () => {
        tryOepnAC()
      }

      cm.on('cursorActivity', (cm, event) => {
        tryOepnAC()
      })

      cm.on('keyup', (cm, event) => {
        if (!cm.state.completionActive && /* Enables keyboard navigation in autocomplete list */
          event.keyCode !== 13 && event.keyCode !== 27) { /* Enter - do not open autocomplete list just after item has been selected in it */
          tryOepnAC()
        }
      })

      this.runCore()
      this.runHighlight()
    },
    replace (replaceMe) {
      var cm = this.cm
      var oldCursor = cm.getCursor()
      var A1 = oldCursor.line
      var A2 = oldCursor.ch

      var B1 = cm.findWordAt({ line: A1, ch: A2 }).anchor.ch
      var B2 = cm.findWordAt({ line: A1, ch: A2 }).head.ch

      cm.replaceRange(replaceMe, { line: A1, ch: B1 }, { line: A1, ch: B2 })
      cm.setCursor({ line: A1, ch: B1 })
    },
    handleWordSuggestion (cm, option) {
      /*
      [
        ['wordA', 'related'],
        ['wordA', 'related'],
        ['wordA', 'related']
      ]
      */

      /* eslint-disable */

      return new Promise((resolve, reject) => {
        let run = () => {
          var suggs = this.suggestions
          // console.log(JSON.stringify(suggs, null, '  '))
          var cursor = cm.getCursor(), line = cm.getLine(cursor.line)
          var start = cursor.ch, end = cursor.ch
          while (start && /\w/.test(line.charAt(start - 1))) --start
          while (end < line.length && /\w/.test(line.charAt(end))) ++end
          var word = line.slice(start, end).toLowerCase()
          let flatMe = (c, arr) => {
            arr.forEach((i) => {
              if (!c.includes(i)) {
                i = i.replace(/_/, ' ')
                c.push(i)
              }
            })
            c = uniq(c)
            return c
          }

          for (var i = 0; i < suggs.length; i++) {
            if (suggs[i].indexOf(word) !== -1) {
              console.log(word)
              return resolve({
                list: suggs[i].filter(e => e),
                from: CodeMirror.Pos(cursor.line, start),
                to: CodeMirror.Pos(cursor.line, end)
              })
            }
          }
          return resolve(null)
        }

        run()
        // setTimeout(run, 0)
      })
      /* eslint-enable */
    }
  },
  beforeMount () {
    var self = this

    CodeMirror.defineMode('funQueryLanguage', () => {
      var parserState = {
        curlyQuoteIsOpen: false,
        curlyQuoteName: 'Quote'
      }
      return {
        token (stream, state) {
          let title = ''
          let quote = ''
          let detectedType = null

          self.result = self.result || {}
          Object.keys(self.result.dictionary || {}).forEach((kn) => {
            if (detectedType === null) {
              if (stream.match(kn)) {
                let detected = self.result.dictionary[kn][0]
                detectedType = detected
              } else {
                detectedType = null
              }
            }
          })

          self.tables.forEach((et) => {
            if (detectedType === null) {
              detectedType = et.reduce((ans, item) => {
                // console.log(item)
                if (stream.match(item)) {
                  ans = 'TableInstance'
                }
                return ans
              }, null)
            }
          })

          if (stream.match(/### .+/g)) {
            title += ' ParagraphTitle-3'
          } else if (stream.match(/## .+/g)) {
            title += ' ParagraphTitle-2'
          } else if (stream.match(/# .+/g)) {
            title += ' ParagraphTitle-1'
          }

          if (stream.string.match(/}/, false)) {
            quote = parserState.curlyQuoteName = 'Quote'
            // parserState.curlyQuoteIsOpen = false
          }
          if (stream.string.match(/\+}/, false)) {
            quote = parserState.curlyQuoteName = 'StarQuote'
            // parserState.curlyQuoteIsOpen = false
          }
          if (stream.string.match(/\+\+}/, false)) {
            quote = parserState.curlyQuoteName = 'DoubleStarQuote'
            // parserState.curlyQuoteIsOpen = false
          }

          if (stream.string.match(/-}/, false)) {
            quote = parserState.curlyQuoteName = 'HiddenQuote'
            // parserState.curlyQuoteIsOpen = false
          }
          if (stream.string.match(/--}/, false)) {
            quote = parserState.curlyQuoteName = 'DoubleHiddenQuote'
            // parserState.curlyQuoteIsOpen = false
          }

          if (stream.string.match(/\+-}/, false)) {
            quote = parserState.curlyQuoteName = 'ControversialQuote'
            // parserState.curlyQuoteIsOpen = false
          }
          if (stream.string.match(/-\+}/, false)) {
            quote = parserState.curlyQuoteName = 'ControversialQuote'
            // parserState.curlyQuoteIsOpen = false
          }

          if (stream.match(/{/, false)) {
            parserState.curlyQuoteIsOpen = true
          }

          if (stream.match(/}/, false)) {
            quote = parserState.curlyQuoteName
            parserState.curlyQuoteIsOpen = false
          }

          if (parserState.curlyQuoteIsOpen) {
            quote = parserState.curlyQuoteName
          } else {
            parserState.curlyQuoteName = 'Quote'
          }

          let output = (detectedType ? detectedType + ' ' : '') + title + quote
          if (detectedType === null) {
            stream.next()
          }

          return output
          // if (stream.match('const')) {
          //   return 'style-a'
          // } else if (stream.match('bbb')) {
          //   return 'style-b'
          // } else {
          //   stream.next()
          //   return null
          // }
        }
      }
    })
  }
}
</script>

<style>

.rhymes-suggestions li{
  cursor: pointer;
  margin-bottom: 0px;
}
.rhymes-suggestions li:hover{
  text-decoration: underline;
}
.codemirrorbox{
  height: 500px;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: perspective(500px) translateZ(-50px) translateY(50px) rotateX(-30deg);
  }
  100%{
    opacity: 1;
    transform: perspective(500px) rotateX(0deg);
  }
}

.CodeMirror {
  font-family: 'Inconsolata', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 17px;
}
.CodeMirror-gutters{
  background-color: rgb(255,255,255,0.25);
  color: black;
}
.CodeMirror{
  height: 100%;
  width: 100%;
  background-color: rgb(223, 223, 223);
}
.CodeMirror-hints{
  /* z-index: 10000; */
  position: absolute;
  background-color: white;
  margin-bottom: 0px;
  list-style: none;
  padding: 2px 16px;
  z-index: 1000;

  animation: fadeIn 0.5s cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s 1 normal both;
}
.CodeMirror-hint {
  margin-bottom: 5px;
}
.CodeMirror-hint:hover {
  text-decoration: underline;
}
.CodeMirror-hint-active{
  font-weight: bold;
  color: green;
  /* text-decoration: underline; */
}
.cm-ParagraphTitle-1{
  font-size: 35px;
  font-weight: bold;
  border-bottom: rgb(31, 182, 202) dashed 2px;
}
.cm-ParagraphTitle-2{
  font-size: 25px;
  font-weight: bold;
  border-bottom: rgb(31, 182, 202) dashed 2px;
}
.cm-ParagraphTitle-3{
  font-weight: bold;
  border-bottom: rgb(31, 182, 202) dashed 2px;
}

.cm-TableInstance{
  font-weight: bold;
  border-bottom: rgb(31, 202, 173) solid 2px;
}
.cm-HolderInstance{
  font-weight: bold;
  border-bottom: rgb(202, 108, 31) dashed 2px;
}
.cm-ResultInstnace{
  font-weight: bold;
  border-bottom: rgb(202, 31, 165) dashed 2px;
}
.cm-FieldInstance{
  font-weight: bold;
  border-bottom: rgb(202, 122, 31) dashed 2px;
}

.cm-OrderInstance{
  font-weight: bold;
  border-bottom: rgb(31, 191, 202) dashed 2px;
}
.cm-NumberInstance{
  font-weight: bold;
  background-color: rgb(176, 224, 228);
}

.cm-IDInstance{
  font-weight: bold;
  border-bottom: rgb(31, 139, 202) dashed 2px;
}

.cm-Table{
  border-bottom: rgba(52, 209, 20, 0.55) solid 2px;
}

.cm-Rhyme{
  border-bottom: rgba(52, 209, 20, 0.55) solid 2px;
}

.cm-Quote{
  background: rgb(253, 255, 134, 0.55);
}

.cm-StarQuote{
  background: rgba(255, 227, 134, 0.8);
}

.cm-DoubleStarQuote{
  background: rgb(255, 203, 134);
}

.cm-HiddenQuote{
  background: rgba(255, 134, 255, 0.8);
}

.cm-DoubleHiddenQuote{
  background: rgb(212, 0, 255, 0.8);
}

.cm-ControversialQuote{
  color: white;
  background: rgb(4, 0, 255);
}

.cm-Existence{
  padding-bottom: 1px;
  border-bottom: hotpink solid 2px;
}
.cm-Being{
  padding-bottom: 1px;
  border-bottom: rgb(31, 182, 202) solid 2px;
}
.cm-Quote.cm-Existence{
  padding-bottom: 1px;
  border-bottom: hotpink solid 2px;
}
.cm-Quote.cm-Being{
  padding-bottom: 1px;
  border-bottom: rgb(31, 182, 202) solid 2px;
}

/* folding */

.CodeMirror-foldmarker {
  color: blue;
  text-shadow: #b9f 1px 1px 2px, #b9f -1px -1px 2px, #b9f 1px -1px 2px, #b9f -1px 1px 2px;
  font-family: arial;
  line-height: .3;
  cursor: pointer;
}
.CodeMirror-foldgutter {
  width: .7em;
}
.CodeMirror-foldgutter-open,
.CodeMirror-foldgutter-folded {
  color: #555;
  cursor: pointer;
}
.CodeMirror-foldgutter-open:after {
  content: "\25BE";
}
.CodeMirror-foldgutter-folded:after {
  content: "\25B8";
}

.cm-colormark{
  position: relative;
}

.cm-pre{
/*   outline: red solid 1px; */
  font-size: 20px;
  line-height: 26px;
  font-family: 'Inconsolata', monospace;
  margin: 0;
  overflow: initial;
  color: transparent;
  width: 100%;
  height: 100%;
  min-height: 500px;
}
.cm-label{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: inline;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  cursor: text;
}
.cm-textarea{
  margin: 0;
  padding: 0;
  border: 0;
  background: 0;
  outline: none;
  resize: none;
  min-width: 100%;
  min-height: 100%;
  overflow: hidden;
  color: rgba(0,0,0,1.0);
  caret-color: red;
  font-size: 20px;
  line-height: 26px;
  font-family: 'Inconsolata', monospace;
  box-sizing: border-box;
}
.cm-textarea:focus{
  border: none;
}

.cm-pre > span,
.cm-query-line{
  display: block;
}
.cm-hidevisual{
  visibility: hidden;
}

.cm-line{
}

.nl-PlaceHolder{
  border-bottom: green solid 3px;
}

.nl-BeHere{
  border-bottom: hotpink solid 3px;
}

.array-wrapper{
  margin: 0px;
  padding: 5px 10px;
}
.item-wrapper{
  margin: 10px 10px;
  padding: 5px;
  border-left: grey solid 2px;
  border-top: silver dotted 1px;
  border-bottom: silver dotted 1px;
}

.alt-items:hover{
  text-decoration: underline;
}

.alt-items{
  white-space: pre;
}

</style>
