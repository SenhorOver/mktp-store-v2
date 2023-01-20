import { useState } from "react"
import { useRouter } from 'next/router'
import {
  IconButton,
  InputBase,
  Paper,
  CircularProgress,
} from "@mui/material"
import { Search } from "@mui/icons-material"

import styles from "./styles"

const SearchBar = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [search, setSearch] = useState()

  const handleSearch = (e) => {
      e.preventDefault()
      if(!search) return

      setLoading(true)
      router.push(`/search/${search}`)
      setLoading(false)
  }
  return (
    <form onSubmit={handleSearch} style={{ padding: '0 15px' }}>
      <Paper sx={styles.paper}>
        <InputBase
            placeholder="Ex.: iPhone 12 com garantia"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton type="submit">
          {
            loading
              ? <CircularProgress size={'24px'} />
              : <Search /> 
          }
        </IconButton>
      </Paper>
    </form>
  )
}


export default SearchBar