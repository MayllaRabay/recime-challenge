import { LocalStorageAdapter } from "@/app/infra/cache"

export const makeLocalStorageAdapter = (): LocalStorageAdapter => {
  return new LocalStorageAdapter()
}
