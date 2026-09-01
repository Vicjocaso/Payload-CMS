import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-vercel-postgres'
import { statement as up01 } from '../migration-parts/initial_up_01'
import { statement as up02 } from '../migration-parts/initial_up_02'
import { statement as up03 } from '../migration-parts/initial_up_03'
import { statement as up04 } from '../migration-parts/initial_up_04'
import { statement as up05 } from '../migration-parts/initial_up_05'
import { statement as up06 } from '../migration-parts/initial_up_06'
import { statement as up07 } from '../migration-parts/initial_up_07'
import { statement as up08 } from '../migration-parts/initial_up_08'
import { statement as up09 } from '../migration-parts/initial_up_09'
import { statement as up10 } from '../migration-parts/initial_up_10'
import { statement as up11 } from '../migration-parts/initial_up_11'
import { statement as up12 } from '../migration-parts/initial_up_12'
import { statement as up13 } from '../migration-parts/initial_up_13'
import { statement as up14 } from '../migration-parts/initial_up_14'
import { statement as up15 } from '../migration-parts/initial_up_15'
import { statement as up16 } from '../migration-parts/initial_up_16'
import { statement as up17 } from '../migration-parts/initial_up_17'
import { statement as up18 } from '../migration-parts/initial_up_18'
import { statement as up19 } from '../migration-parts/initial_up_19'
import { statement as up20 } from '../migration-parts/initial_up_20'
import { statement as up21 } from '../migration-parts/initial_up_21'
import { statement as up22 } from '../migration-parts/initial_up_22'
import { statement as up23 } from '../migration-parts/initial_up_23'
import { statement as up24 } from '../migration-parts/initial_up_24'
import { statement as up25 } from '../migration-parts/initial_up_25'
import { statement as down01 } from '../migration-parts/initial_down_01'
import { statement as down02 } from '../migration-parts/initial_down_02'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(up01)
  await db.execute(up02)
  await db.execute(up03)
  await db.execute(up04)
  await db.execute(up05)
  await db.execute(up06)
  await db.execute(up07)
  await db.execute(up08)
  await db.execute(up09)
  await db.execute(up10)
  await db.execute(up11)
  await db.execute(up12)
  await db.execute(up13)
  await db.execute(up14)
  await db.execute(up15)
  await db.execute(up16)
  await db.execute(up17)
  await db.execute(up18)
  await db.execute(up19)
  await db.execute(up20)
  await db.execute(up21)
  await db.execute(up22)
  await db.execute(up23)
  await db.execute(up24)
  await db.execute(up25)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(down01)
  await db.execute(down02)
}
