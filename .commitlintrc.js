module.exports = {
  extends: ['gitmoji'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(?<type>:\w*:)(?:\s)(?:\((?<scope>.*?)\))?\s(?<subject>(?:.*(?=\())|.*)(?:\(#(?<ticket>\d*)\))?/,
      headerCorrespondence: ['type', 'scope', 'subject', 'ticket']
    }
  }
}
