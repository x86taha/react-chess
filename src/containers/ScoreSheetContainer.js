import { connect } from 'react-redux'
import { curry, compose, map, reverse } from 'ramda'
import { ScoreSheet } from '~/components'
import { createNotation, applyToScoreSheet } from '~/chess/core'

const combineSnapshotList = curry((presentSnapshot, pastSnapshotList) => [
  presentSnapshot,
  ...pastSnapshotList
])

const mapStateToProps = ({ general, ingame }) => {
  const { present, past } = ingame
  const { isDoingMatch } = general
  const { snapshot: presentSnapshot } = present
  const sheet = compose(
    applyToScoreSheet,
    reverse,
    createNotation,
    combineSnapshotList(presentSnapshot),
    map((pastIngame) => pastIngame.snapshot),
    reverse
  )(past)

  return { isDoingMatch, sheet }
}

const ScoreSheetContainer = connect(mapStateToProps)(ScoreSheet)

export default ScoreSheetContainer
