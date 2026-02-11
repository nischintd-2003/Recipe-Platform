import { Box, Container, Grid, Skeleton } from "@mui/material";

const LoadingFallback = () => (
  <Container sx={{ py: 4 }}>
    {/*Hero Banner */}
    <Skeleton
      variant="rectangular"
      height={200}
      sx={{ borderRadius: 4, mb: 5 }}
    />

    {/* Filter Bar */}
    <Box display="flex" justifyContent="space-between" mb={4}>
      <Skeleton variant="text" width={200} height={40} />
      <Skeleton
        variant="rectangular"
        width={120}
        height={56}
        sx={{ borderRadius: 3 }}
      />
    </Box>

    {/* Recipe Grid  */}
    <Grid container spacing={4}>
      {[...Array(6)].map((_, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
          {/* Card Image */}
          <Skeleton
            variant="rectangular"
            height={180}
            sx={{ borderRadius: 3, mb: 1 }}
          />
          {/* Title */}
          <Skeleton variant="text" width="80%" height={30} />
          {/* Rating Meta */}
          <Skeleton variant="text" width="40%" />
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default LoadingFallback;
