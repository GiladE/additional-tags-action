'use strict'

const { execFileSync } = require('child_process')
const core = require('@actions/core');


try {
  const maxBuffer = 1024 * 1024 * 16
  const tag = core.getInput('version')

  if (!tag) {
    // Nothing to do
  } else if (!/^\d+\.\d+\.\d+$/.test(tag)) {
    console.log('Skipping tag %s', tag)
  } else {
    const [major, minor] = tag.slice(1).split('.')
    const majorTag = major
    const minorTag = major + '.' + minor

    execFileSync('git', ['config', 'user.name', 'github-actions'])
    execFileSync('git', ['config', 'user.email', 'github-actions@github.com'])
    execFileSync('git', ['tag', '-fa', majorTag, '-m', majorTag])
    execFileSync('git', ['tag', '-fa', minorTag, '-m', minorTag])
    execFileSync('git', ['push', '--tags', '-f'])
  }
} catch (err) {
  console.log('::error::%s', err.message || String(err))
  process.exit(1)
}
