<template>
  <div>
    <textarea v-model="query" style="width: 100%;" rows="10"></textarea>
    <pre>{{ result }}</pre>
  </div>
</template>

<script>
// import * as FQL from '../../apis/FQL.js'
import nlp from 'compromise'
export default {
  data () {
    return {
      result: false,
      query: `
Let’s make a data bucket and call it home_page_bucket.

Go get some data from post table, store results in home_page_bucket, and label it as latest_posts, skip 100 items and get the first 10.

Go get some data from comments table, look for postID 1 in it, store results in home_page_bucket, and label it as latest_comments, skip 0 items and get the first 20.
`
    }
  },
  watch: {
    query () {
      this.processFQL()
    }
  },
  mounted () {
    this.processFQL()
  },
  methods: {
    processFQL () {
      let ctx = {
        queries: [],
        buckets: []
      }
      let dictionary = {
        'bucket': ['DataHolder']
      }

      nlp.plugin({
        tags: {},
        dictionary,
        patterns: {},
        regex: {},
        plurals: {}
      })

      this.query.split('\n').filter(e => e).forEach((sentence, idx) => {
        this.procSentence({ sentence, dictionary, ctx })
      })

      this.result = {
        ctx,
        dictionary
      }
    },
    procSentence ({ sentence, dictionary, ctx }) {
      let addBucket = ({ holderObj }) => {
        ctx.buckets.push(holderObj)
      }
      let addQuery = ({ query }) => {
        ctx.queries.push(query)
      }
      let tagsToLexicon = ({ lexicon, keyname, tagsToAdd }) => {
        let lexArr = lexicon[keyname] = lexicon[keyname] || []
        tagsToAdd.forEach((tag) => {
          if (!lexArr.includes(tag)) {
            lexArr.unshift(tag)
          }
        })
      }

      let holder = {
        type: 'bucket',
        id: ''
      }

      let query = {
        table: '',
        id: '',
        bucket: ''
      }

      console.log(sentence)

      nlp(sentence)
        .match(`make a data bucket and call it [*]`)
        .not('the')
        .not('and')
        .out('tags')
        .forEach((entry) => {
          holder.id = entry.text
          tagsToLexicon({ lexicon: dictionary, keyname: entry.text, tagsToAdd: ['HolderInstance'] })
          addBucket({ holderName: entry.text, holderObj: holder })
        })

      if (sentence.toLowerCase().indexOf('go get some data from') !== -1) {
        nlp(sentence)
          .match(`Go get some data from [*] table`)
          .not('the')
          .not('and')
          .out('tags')
          .forEach((entry) => {
            query.table = entry.text
            addQuery({ query })
            tagsToLexicon({ lexicon: dictionary, keyname: entry.text, tagsToAdd: ['TableInstance'] })
          })
        // , just skip [*] items and get the first [*]
        nlp(sentence)
          .match(`store results in [*] and`)
          .not('the')
          .not('and')
          .out('tags')
          .forEach((entry) => {
            query.bucket = entry.text
          })

        nlp(sentence)
          .match(`#HolderInstance? and label it as [*]`)
          .not('the')
          .not('and')
          .out('tags')
          .forEach((entry, idx) => {
            if (idx === 0) {
              query.id = entry.text
              tagsToLexicon({ lexicon: dictionary, keyname: entry.text, tagsToAdd: ['ResultInstnace'] })
            }
          })

        nlp(sentence)
          .match(`#HolderInstance? look for [.] [.] in it?`)
          .not('the')
          .not('and')
          .out('tags')
          .forEach((entry, idx) => {
            if (idx === 0) {
              query.lookForField = entry.text
            } else if (idx === 1) {
              query.lookForID = Number(entry.text)
            }
          })
      }
    }
  }
}
</script>

<style>

</style>
