const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.bayfancy.com"

// Helper function for API requests
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
    },
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...defaultOptions,
    ...options,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "An error occurred while fetching data")
  }

  return response.json()
}

// Authentication
export async function login(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "An error occurred while logging in")
  }

  return response.json()
}

// Home Page Content
export async function getHomepageContent() {
  return fetchAPI("/content/homepage")
}

export async function updateHomepageContent(data: any) {
  return fetchAPI("/content/homepage", {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

// Banner Management
export async function getBanners() {
  return fetchAPI("/content/banners")
}

export async function createBanner(data: any) {
  return fetchAPI("/content/banners", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function updateBanner(id: string, data: any) {
  return fetchAPI(`/content/banners/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export async function deleteBanner(id: string) {
  return fetchAPI(`/content/banners/${id}`, {
    method: "DELETE",
  })
}

// Welcome Section
export async function getWelcomeSection() {
  return fetchAPI("/content/welcome")
}

export async function updateWelcomeSection(data: any) {
  return fetchAPI("/content/welcome", {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

// Media/Recent Updates
export async function getMediaItems(params: { limit?: number; type?: string } = {}) {
  const queryParams = new URLSearchParams()
  if (params.limit) queryParams.append("limit", params.limit.toString())
  if (params.type) queryParams.append("type", params.type)

  return fetchAPI(`/content/media?${queryParams.toString()}`)
}

export async function getMediaItem(id: string) {
  return fetchAPI(`/content/media/${id}`)
}

export async function createMediaItem(data: any) {
  return fetchAPI("/content/media", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function updateMediaItem(id: string, data: any) {
  return fetchAPI(`/content/media/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export async function deleteMediaItem(id: string) {
  return fetchAPI(`/content/media/${id}`, {
    method: "DELETE",
  })
}

// Footer
export async function getFooterContent() {
  return fetchAPI("/content/footer")
}

export async function updateFooterContent(data: any) {
  return fetchAPI("/content/footer", {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

// About Us
export async function getAboutUsContent() {
  return fetchAPI("/content/about")
}

export async function updateAboutUsContent(data: any) {
  return fetchAPI("/content/about", {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

// Board of Directors
export async function getBoardMembers() {
  return fetchAPI("/content/board")
}

export async function createBoardMember(data: any) {
  return fetchAPI("/content/board", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function updateBoardMember(id: string, data: any) {
  return fetchAPI(`/content/board/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export async function deleteBoardMember(id: string) {
  return fetchAPI(`/content/board/${id}`, {
    method: "DELETE",
  })
}

// Management Team
export async function getManagementTeam() {
  return fetchAPI("/content/management")
}

export async function createManagementMember(data: any) {
  return fetchAPI("/content/management", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function updateManagementMember(id: string, data: any) {
  return fetchAPI(`/content/management/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export async function deleteManagementMember(id: string) {
  return fetchAPI(`/content/management/${id}`, {
    method: "DELETE",
  })
}

// Business Categories
export async function getBusinessCategories() {
  return fetchAPI("/content/businesses")
}

export async function getBusinessCategory(id: string) {
  return fetchAPI(`/content/businesses/${id}`)
}

export async function updateBusinessCategory(id: string, data: any) {
  return fetchAPI(`/content/businesses/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

// Projects
export async function getProjects(businessId?: string) {
  const endpoint = businessId ? `/content/businesses/${businessId}/projects` : "/content/projects"
  return fetchAPI(endpoint)
}

export async function getProject(id: string) {
  return fetchAPI(`/content/projects/${id}`)
}

export async function createProject(data: any) {
  return fetchAPI("/content/projects", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function updateProject(id: string, data: any) {
  return fetchAPI(`/content/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export async function deleteProject(id: string) {
  return fetchAPI(`/content/projects/${id}`, {
    method: "DELETE",
  })
}

// Media Library
export async function getMediaLibrary(params: { page?: number; limit?: number; type?: string } = {}) {
  const queryParams = new URLSearchParams()
  if (params.page) queryParams.append("page", params.page.toString())
  if (params.limit) queryParams.append("limit", params.limit.toString())
  if (params.type) queryParams.append("type", params.type)

  return fetchAPI(`/media?${queryParams.toString()}`)
}

export async function uploadMedia(file: File, metadata: any = {}) {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("metadata", JSON.stringify(metadata))

  return fetch(`${API_BASE_URL}/media/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
    },
    body: formData,
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to upload file")
    }
    return response.json()
  })
}

export async function deleteMedia(id: string) {
  return fetchAPI(`/media/${id}`, {
    method: "DELETE",
  })
}

