import { connect } from 'react-redux'
import * as R from 'ramda'
import { ScoreSheet } from '~/components'
import { createNotation, createScoreSheet } from '~/chess/core'
import { createTimeline } from '~/chess/helpers'

const mapStateToProps = ({ general, ingame }) => {
  const { present, past } = ingame
  const { isDoingMatch } = general
  const sheet = R.compose(
    createScoreSheet,
    R.reverse,
    createNotation,
    createTimeline(present.snapshot)
  )(past)

  return { isDoingMatch, sheet }
}

const ScoreSheetContainer = connect(mapStateToProps)(ScoreSheet)

export default ScoreSheetContainer
