import { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Slider,
  Typography,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  Badge,
  IconButton,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import SortIcon from "@mui/icons-material/Sort";
import type { RecipeFiltersUIProps } from "../interfaces/props.interface";


const RecipeFiltersUI = ({ filters, onFilterChange, onClear }: RecipeFiltersUIProps) => {
  const [open, setOpen] = useState(false);

  const activeFiltersCount = [
    filters.minRating && filters.minRating > 0,
    filters.maxPrepTime && filters.maxPrepTime < 120,
    filters.sort && filters.sort !== "latest",
  ].filter(Boolean).length;

  return (
    <Box sx={{ mb: 4 }}>
      <Box display="flex" gap={2} alignItems="center">
        {/* Search Bar */}
        <TextField
          placeholder="Search recipes, ingredients..."
          variant="outlined"
          size="medium"
          fullWidth
          value={filters.q || ""}
          onChange={(e) => onFilterChange({ q: e.target.value, page: 1 })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            sx: { borderRadius: 3, bgcolor: "background.paper" },
          }}
        />

        {/* Filter Button */}
        <Badge badgeContent={activeFiltersCount} color="primary">
          <Button
            variant="outlined"
            size="large"
            startIcon={<FilterListIcon />}
            onClick={() => setOpen(true)}
            sx={{
              height: 56,
              px: 3,
              borderRadius: 3,
              borderColor: "divider",
              color: "text.primary",
              bgcolor: "background.paper",
              whiteSpace: "nowrap",
              "&:hover": {
                borderColor: "primary.main",
                bgcolor: "background.paper",
              },
            }}
          >
            Filters
          </Button>
        </Badge>
      </Box>

      {/* Filter Modal */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="xs"
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 1,
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            Filter & Sort
          </Typography>
          <IconButton onClick={() => setOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Divider />

        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 4, py: 4 }}
        >
          {/* Sort Order */}
          <Box>
            <Typography
              variant="subtitle2"
              fontWeight={700}
              gutterBottom
              display="flex"
              alignItems="center"
              gap={1}
            >
              <SortIcon fontSize="small" color="primary" /> Sort By
            </Typography>
            <TextField
              select
              fullWidth
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
              <MenuItem value="rating">Highest Rated</MenuItem>
            </TextField>
          </Box>

          {/* Min Rating */}
          <Box>
            <Typography
              variant="subtitle2"
              fontWeight={700}
              gutterBottom
              display="flex"
              alignItems="center"
              gap={1}
            >
              <StarIcon fontSize="small" color="primary" /> Minimum Rating
            </Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <Rating
                value={filters.minRating || 0}
                onChange={(_, value) =>
                  onFilterChange({ minRating: value || 0, page: 1 })
                }
                precision={1}
                size="large"
              />
            </Box>
          </Box>

          {/* Prep Time */}
          <Box>
            <Typography
              variant="subtitle2"
              fontWeight={700}
              gutterBottom
              display="flex"
              alignItems="center"
              gap={1}
            >
              <AccessTimeIcon fontSize="small" color="primary" /> Max Prep Time
            </Typography>
            <Box px={1}>
              <Slider
                value={filters.maxPrepTime || 120}
                min={10}
                max={120}
                step={5}
                valueLabelDisplay="auto"
                valueLabelFormat={(v) => `${v}m`}
                onChange={(_, value) =>
                  onFilterChange({ maxPrepTime: value as number, page: 1 })
                }
              />
              <Box display="flex" justifyContent="space-between" mt={-1}>
                <Typography variant="caption" color="text.secondary">
                  10m
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {filters.maxPrepTime && filters.maxPrepTime < 180
                    ? `${filters.maxPrepTime}m`
                    : "Any"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>

        <Divider />

        <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
          <Button
            onClick={onClear}
            color="inherit"
            disabled={activeFiltersCount === 0}
          >
            Clear All
          </Button>
          <Button
            onClick={() => setOpen(false)}
            variant="contained"
            disableElevation
          >
            Show Results
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RecipeFiltersUI;
