import {
  Box,
  TextField,
  MenuItem,
  Slider,
  Typography,
  InputAdornment,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import type { RecipeFilters } from "../interfaces/recipe.interface";

interface Props {
  filters: RecipeFilters;
  onFilterChange: (newFilters: Partial<RecipeFilters>) => void;
  onClear: () => void;
}

const RecipeFiltersUI = ({ filters, onFilterChange, onClear }: Props) => {
  return (
    <Box sx={{ p: 3, mb: 4}}>
      
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <FilterListIcon color="primary" />
        <Typography variant="h6" fontWeight={700}>
          Filter Recipes
        </Typography>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr 1fr" }}
        gap={3}
      >
        {/*Search Bar */}
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={filters.q || ""}
          onChange={(e) => onFilterChange({ q: e.target.value, page: 1 })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        {/*Sort Dropdown */}
        <TextField
          select
          label="Sort By"
          size="small"
          value={filters.sort || "latest"}
          onChange={(e) =>
            onFilterChange({
              sort: e.target.value as "latest" | "rating",
              page: 1,
            })
          }
        >
          <MenuItem value="latest">Newest First</MenuItem>
          <MenuItem value="rating">Top Rated</MenuItem>
        </TextField>

        {/* Prep Time Slider */}
        <Box px={1}>
          <Typography variant="caption" color="text.secondary" gutterBottom>
            Max Prep Time: {filters.maxPrepTime || 60} mins
          </Typography>
          <Slider
            value={filters.maxPrepTime || 60}
            min={10}
            max={120}
            step={5}
            valueLabelDisplay="auto"
            onChange={(_, value) =>
              onFilterChange({ maxPrepTime: value as number, page: 1 })
            }
          />
        </Box>
      </Box>

      {/* Clear Button */}
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button size="small" onClick={onClear} color="secondary">
          Reset Filters
        </Button>
      </Box>
    </Box>
  );
};

export default RecipeFiltersUI;
