'use client'

import { SearchIcon } from "lucide-react"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"

const Search = () => {
  return (
    <div className="flex items-center gap-2">
      <Input placeholder="Busce por uma barbearia..."/>
      <Button variant='default'>
        <SearchIcon size={18} />
      </Button>
    </div>
  )
}

export default Search