import { Item } from '../../../models/dbModels'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const items = await Item.find({}).exec()
    return NextResponse.json( items , { status: 200 })
  } catch (error: any) {
    console.error('Error fetching items:', error?.message)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
