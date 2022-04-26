import { sanitizeAll, trimAll } from "../../services/v1/input-services.mjs";
import { changeAboutItem, getAboutItemBySlug, getAllAboutItems, newAboutItem } from "../../models/v1/about-models.mjs";

async function addAboutItem (req, reply) {
  const { mongo: { db: _db, ObjectId: _ObjectId } } = this

  const { body, verifiedAuthToken: { role, sub }, } = req
  // Array of roles authorized to create about items
  const rolesAuthorized = ['siteadmin', 'superadmin']
  const canCreate = rolesAuthorized.indexOf(role) !== -1

  if (canCreate) {
    const trimmed = trimAll(body)
    const aboutItemInfo = sanitizeAll(trimmed)
    // TODO: Check that the userId in the client submittal equals the userId from the token (i.e. sub)
    const result = await newAboutItem(_db, _ObjectId, aboutItemInfo)
    return result
  } else {
    throw new Error('current role cannot create a course')
  }
}

async function readAboutItemBySlugAll (req, reply) {
  const { mongo: { db: _db } } = this

  const { verifiedAuthToken: { role, sub }, } = req

  const filters = []

  if (role === 'superadmin') {
    filters.push({})
  } else if (role === 'siteadmin') {
    filters.push({ ownerId: sub })
  }

  const { params: { slug } } = req
  const result = await getAboutItemBySlug(_db, filters, slug)
  const { status } = result

  if ( status === 'error' ) {
    // TODO: Figure out what the error is and send an appropriate code
    reply
      .code(404)
      .send(result)
  } else if ( status === 'ok') {
    reply
      .code(200)
      .send(result)
  }
}

async function readAllAboutItems( req, reply) {
  const { mongo: { db: _db } } = this

  const result = await getAllAboutItems(_db)
  const { status } = result

  if ( status === 'error' ) {
    // TODO: Figure out what the error is and send an appropriate code
    reply
      .code(404)
      .send(result)
  } else if ( status === 'ok') {
    reply
      .code(200)
      .send(result)
  }
}

async function updateAboutItem (req, reply) {
  const { mongo: { db: _db, ObjectId: _ObjectId} } = this
  const { body, params: { id: aboutItemId }, verifiedAuthToken: { role, sub } } = req

  const rolesAuthorized = ['siteadmin', 'superadmin']
  const canUpdate = rolesAuthorized.indexOf(role) !== -1

  if (canUpdate) {
    const trimmed = trimAll(body)
    const aboutItemInfo = sanitizeAll(trimmed)
    // TODO: Check that the userId in the client submittal equals the userId from the token (i.e. sub)
    const result = await changeAboutItem(_db, _ObjectId, aboutItemId, aboutItemInfo)
    return result
  } else {
    throw new Error('current role cannot update an about item')
  }
}

export { addAboutItem, readAboutItemBySlugAll, readAllAboutItems, updateAboutItem }
