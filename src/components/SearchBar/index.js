import {
  IconButton,
  InputBase,
  Paper,
} from "@mui/material"
import { Search } from "@mui/icons-material"

import styles from "./styles"

const SearchBar = ({ handleSearch, search, setSearch }) => {
  return (
    <form onSubmit={handleSearch}>
      <Paper sx={styles.paper}>
        <InputBase
            placeholder="Ex.: iPhone 12 com garantia"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton>
            <Search />
        </IconButton>
      </Paper>
    </form>
  )
}


export default SearchBar