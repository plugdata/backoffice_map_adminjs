import { createPrismaClient } from '../../config/database.js'

const prisma = createPrismaClient()


export async function addFullName(response) {
    if (!response.records) return response
  
    response.records = response.records.map(r => {
      r.params.title_fullname = `${r.params.title_use || ''} ${r.params.fullName || ''}`.trim()
      return r
    })
  
    return response
  }


export async function joinString(title, fullName) {
    const user = await prisma.user.findUnique({
        where: { id: id },
    })
    return `${user.title} ${user.fullName}`
}

