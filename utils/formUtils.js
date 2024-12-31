import { z } from "zod"

const AnthologySchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

const AnthologyDefaultValues = {
  
}

export const formSchemas = {
  Anthology: AnthologySchema
}