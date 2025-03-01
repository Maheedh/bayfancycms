import fs from "fs/promises"
import path from "path"

const contentDir = path.join(process.cwd(), "content")

async function readJsonFile(fileName: string) {
  const filePath = path.join(contentDir, fileName)
  const fileContent = await fs.readFile(filePath, "utf-8")
  return JSON.parse(fileContent)
}

async function writeJsonFile(fileName: string, data: any) {
  const filePath = path.join(contentDir, fileName)
  await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

export async function getHomeContent() {
  return readJsonFile("home.json")
}

export async function updateHomeContent(data: any) {
  await writeJsonFile("home.json", data)
  return data
}

export async function getAboutContent() {
  return readJsonFile("about.json")
}

export async function updateAboutContent(data: any) {
  await writeJsonFile("about.json", data)
  return data
}

export async function getBusinessesContent() {
  return readJsonFile("businesses.json")
}

export async function updateBusinessesContent(data: any) {
  await writeJsonFile("businesses.json", data)
  return data
}

export async function getNewsContent() {
  return readJsonFile("news.json")
}

export async function updateNewsContent(data: any) {
  await writeJsonFile("news.json", data)
  return data
}

export async function getContactContent() {
  return readJsonFile("contact.json")
}

export async function updateContactContent(data: any) {
  await writeJsonFile("contact.json", data)
  return data
}

export async function getHeroSlider() {
  return readJsonFile("hero-slider.json")
}

export async function getFeaturedProjects() {
  return readJsonFile("featured-projects.json")
}

export async function getAboutSummary() {
  return readJsonFile("about-summary.json")
}

export async function getNewsUpdates() {
  return readJsonFile("news-updates.json")
}

export async function getCompanyOverview() {
  return readJsonFile("company-overview.json")
}

export async function getMissionVision() {
  return readJsonFile("mission-vision.json")
}

export async function getTeamMembers() {
  return readJsonFile("team-members.json")
}

export async function getBusinessCategories() {
  return readJsonFile("business-categories.json")
}

export async function getProjects() {
  return readJsonFile("projects.json")
}

export async function getNewsArticles() {
  return readJsonFile("news-articles.json")
}

export async function getPressReleases() {
  return readJsonFile("press-releases.json")
}

export async function getContactInformation() {
  return readJsonFile("contact-information.json")
}

export async function createContent(contentType: string, data: any) {
  const content = await readJsonFile(`${contentType}.json`)
  const newItem = { id: Date.now().toString(), ...data }
  content.push(newItem)
  await writeJsonFile(`${contentType}.json`, content)
  return newItem
}

export async function updateContent(contentType: string, id: string, data: any) {
  const content = await readJsonFile(`${contentType}.json`)
  const index = content.findIndex((item: any) => item.id === id)
  if (index === -1) throw new Error("Content not found")
  content[index] = { ...content[index], ...data }
  await writeJsonFile(`${contentType}.json`, content)
  return content[index]
}

export async function deleteContent(contentType: string, id: string) {
  const content = await readJsonFile(`${contentType}.json`)
  const newContent = content.filter((item: any) => item.id !== id)
  await writeJsonFile(`${contentType}.json`, newContent)
}

