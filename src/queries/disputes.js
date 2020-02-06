import gql from 'graphql-tag'

export const AllDisputes = gql`
  subscription AllDisputes($limit: Int) {
    disputes(first: $limit, orderBy: createdAt, orderDirection: desc) {
      id
      txHash
      createTermId
      possibleRulings
      finalRuling
      lastRoundId
      state
      metadata
      createdAt
      rounds {
        id
        state
        number
        draftTermId
        jurorsNumber
        settledPenalties
        jurorFees
        delayedTerms
        selectedJurors
        coherentJurors
        collectedTokens
        createdAt
        jurors {
          juror {
            id
          }
          commitment
          outcome
        }
        vote {
          id
          winningOutcome
        }
        appeal {
          id
          maker
          appealedRuling
          taker
          opposedRuling
          settled
          createdAt
        }
      }
    }
  }
`

export const SingleDispute = gql`
  subscription Dispute($id: ID!) {
    dispute(id: $id) {
      id
      txHash
      createTermId
      possibleRulings
      finalRuling
      lastRoundId
      state
      metadata
      createdAt
      evidences {
        id
        submitter
        data
        createdAt
      }
      rounds {
        id
        state
        number
        draftTermId
        jurorsNumber
        settledPenalties
        jurorFees
        delayedTerms
        selectedJurors
        coherentJurors
        collectedTokens
        createdAt
        jurors {
          juror {
            id
          }
          weight
          commitment
          outcome
        }
        vote {
          id
          winningOutcome
        }
        appeal {
          id
          maker
          appealedRuling
          taker
          opposedRuling
          settled
          createdAt
        }
      }
    }
  }
`

export const JurorDrafts = gql`
  query JurorDrafts($id: ID!) {
    juror(id: $id) {
      id
      drafts {
        id
        weight
        rewarded
        commitment
        outcome
        leaker
        createdAt
        round {
          id
          number
          dispute {
            id
            txHash
            createTermId
            possibleRulings
            finalRuling
            lastRoundId
            state
            metadata
            createdAt
            subject {
              id
              evidence {
                id
                submitter
                data
                createdAt
              }
            }
            rounds {
              state
              number
              draftTermId
              jurorsNumber
              settledPenalties
              jurorFees
              delayedTerms
              selectedJurors
              coherentJurors
              collectedTokens
              createdAt
              jurors {
                juror {
                  id
                }
              }
              appeal {
                id
                maker
                appealedRuling
                taker
                opposedRuling
                settled
                createdAt
              }
            }
          }
        }
      }
    }
  }
`

export const CurrentTermJurorDrafts = gql`
  subscription JurorDrafts($id: ID!, $from: BigInt!) {
    juror(id: $id) {
      id
      drafts(where: { createdAt_gt: $from }) {
        id
        createdAt
      }
    }
  }
`