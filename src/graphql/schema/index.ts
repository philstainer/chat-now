import {fieldAuthorizePlugin, makeSchema} from 'nexus'
import {join} from 'path'

import * as types from '@/graphql/schema/types'

export const schema = makeSchema({
  types,
  plugins: [fieldAuthorizePlugin()],
  prettierConfig: join(process.cwd(), '.prettierrc.js'),
  outputs: {
    schema: join(__dirname, '../generated', 'schema.graphql'),
    typegen: join(__dirname, '../generated', 'nexus-typegen.ts'),
  },
  contextType: {
    module: join(__dirname, '../context.ts'),
    export: 'Context',
  },
})
