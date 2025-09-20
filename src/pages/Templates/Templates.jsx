/* eslint-disable react/prop-types */
import {
  Add,
  Analytics,
  Business,
  CalendarViewDay,
  Code,
  ContentCopy,
  DesignServices,
  Favorite,
  FavoriteBorder,
  FilterList,
  Home,
  Launch,
  // Marketing,
  MoreVert,
  School,
  Search,
  ShowChart,
  Star,
 
  ViewList,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Fab,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Rating,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";

// Template data
const templateCategories = [
  { id: "all", label: "Tất cả", icon: < CalendarViewDay /> },
  { id: "business", label: "Kinh doanh", icon: <Business /> },
  { id: "education", label: "Giáo dục", icon: <School /> },
  { id: "personal", label: "Cá nhân", icon: <Home /> },
  { id: "engineering", label: "Kỹ thuật", icon: <Code /> },
  { id: "marketing", label: "Marketing", icon: <ShowChart /> },
  { id: "design", label: "Thiết kế", icon: <DesignServices /> },
  { id: "analytics", label: "Phân tích", icon: <Analytics /> },
];

const templates = [
  {
    id: 1,
    title: "Kanban Project Management",
    description:
      "Quản lý dự án theo phương pháp Kanban với các cột To Do, In Progress, Done",
    category: "business",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=200&fit=crop",
    author: "Trello Team",
    authorAvatar: "T",
    rating: 4.8,
    uses: 12500,
    tags: ["Kanban", "Quản lý dự án", "Teamwork"],
    featured: true,
    premium: false,
  },
  {
    id: 2,
    title: "Sprint Planning",
    description: "Template cho Sprint Planning trong phát triển phần mềm Agile",
    category: "engineering",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
    author: "DevOps Team",
    authorAvatar: "D",
    rating: 4.9,
    uses: 8900,
    tags: ["Agile", "Sprint", "Development"],
    featured: true,
    premium: false,
  },
  {
    id: 3,
    title: "Content Marketing Calendar",
    description:
      "Lên kế hoạch và theo dõi nội dung marketing trên các nền tảng",
    category: "marketing",
    image:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=200&fit=crop",
    author: "Marketing Pro",
    authorAvatar: "M",
    rating: 4.7,
    uses: 15600,
    tags: ["Content", "Marketing", "Calendar"],
    featured: false,
    premium: true,
  },
  {
    id: 4,
    title: "Wedding Planning",
    description: "Tổ chức đám cưới hoàn hảo với checklist và timeline chi tiết",
    category: "personal",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=200&fit=crop",
    author: "Event Planner",
    authorAvatar: "E",
    rating: 4.6,
    uses: 7800,
    tags: ["Wedding", "Event", "Personal"],
    featured: false,
    premium: false,
  },
  {
    id: 5,
    title: "Design System",
    description: "Quản lý và theo dõi tiến độ phát triển design system",
    category: "design",
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=200&fit=crop",
    author: "Design Team",
    authorAvatar: "D",
    rating: 4.8,
    uses: 5400,
    tags: ["Design System", "UI/UX", "Components"],
    featured: true,
    premium: true,
  },
  {
    id: 6,
    title: "Student Assignment Tracker",
    description: "Theo dõi bài tập và deadline cho sinh viên",
    category: "education",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop",
    author: "Edu Helper",
    authorAvatar: "E",
    rating: 4.5,
    uses: 9200,
    tags: ["Education", "Assignment", "Student"],
    featured: false,
    premium: false,
  },
  {
    id: 7,
    title: "Sales Pipeline",
    description: "Theo dõi leads và cơ hội bán hàng từ prospect đến close",
    category: "business",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
    author: "Sales Expert",
    authorAvatar: "S",
    rating: 4.7,
    uses: 11300,
    tags: ["Sales", "Pipeline", "CRM"],
    featured: true,
    premium: false,
  },
  {
    id: 8,
    title: "Bug Tracking",
    description: "Theo dõi và quản lý bugs trong quá trình phát triển phần mềm",
    category: "engineering",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop",
    author: "QA Team",
    authorAvatar: "Q",
    rating: 4.6,
    uses: 6700,
    tags: ["Bug Tracking", "QA", "Testing"],
    featured: false,
    premium: false,
  },
  {
    id: 9,
    title: "Marketing Analytics Dashboard",
    description: "Theo dõi KPIs và metrics của các chiến dịch marketing",
    category: "analytics",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
    author: "Analytics Pro",
    authorAvatar: "A",
    rating: 4.9,
    uses: 4200,
    tags: ["Analytics", "KPI", "Dashboard"],
    featured: true,
    premium: true,
  },
];

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [favorites, setFavorites] = useState(new Set([1, 5, 7]));

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory =
      selectedCategory === "all" || template.category === selectedCategory;
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const featuredTemplates = templates.filter((template) => template.featured);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
    setOpenDialog(true);
  };

  const toggleFavorite = (templateId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(templateId)) {
        newFavorites.delete(templateId);
      } else {
        newFavorites.add(templateId);
      }
      return newFavorites;
    });
  };

  const TemplateCard = ({ template, featured = false }) => (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
        },
        border: featured ? "2px solid #0079bf" : "none",
      }}
      onClick={() => handleTemplateClick(template)}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="160"
          image={template.image}
          alt={template.title}
        />
        {template.premium && (
          <Chip
            label="Premium"
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "#ffd700",
              color: "#000",
              fontWeight: "bold",
            }}
          />
        )}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            bgcolor: "rgba(255,255,255,0.9)",
            "&:hover": { bgcolor: "white" },
          }}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(template.id);
          }}
        >
          {favorites.has(template.id) ? (
            <Favorite sx={{ color: "#ff4757" }} />
          ) : (
            <FavoriteBorder />
          )}
        </IconButton>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          {template.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, lineHeight: 1.6 }}
        >
          {template.description}
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
          {template.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              variant="outlined"
              sx={{ fontSize: "0.75rem" }}
            />
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Rating
              value={template.rating}
              precision={0.1}
              size="small"
              readOnly
            />
            <Typography variant="body2" color="text.secondary">
              ({template.rating})
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {template.uses.toLocaleString()} lượt sử dụng
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
              sx={{
                width: 24,
                height: 24,
                fontSize: "0.75rem",
                bgcolor: "#0079bf",
              }}
            >
              {template.authorAvatar}
            </Avatar>
            <Typography variant="body2" color="text.secondary">
              {template.author}
            </Typography>
          </Box>
          <IconButton size="small">
            <MoreVert fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f6fa" }}>
      {/* Header */}
      <AppBar
        position="static"
        sx={{ bgcolor: "white", color: "#333", boxShadow: 1 }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#0079bf" }}>
              Trello Templates
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <TextField
                placeholder="Tìm kiếm template..."
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: 300 }}
              />
              <IconButton>
                <FilterList />
              </IconButton>
              <IconButton
                onClick={() =>
                  setViewMode(viewMode === "grid" ? "list" : "grid")
                }
              >
                {viewMode === "grid" ? <ViewList /> : <ViewGrid />}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ bgcolor: "white", py: 6 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, mb: 2, textAlign: "center" }}
          >
            Bắt đầu nhanh với Templates
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ textAlign: "center", mb: 4 }}
          >
            Khám phá hàng trăm template được thiết kế sẵn để khởi động dự án của
            bạn
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button variant="contained" size="large" startIcon={<Add />}>
              Tạo template mới
            </Button>
            <Button variant="outlined" size="large" startIcon={<Star />}>
              Templates yêu thích
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Featured Templates */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
          Templates nổi bật
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {featuredTemplates.slice(0, 3).map((template) => (
            <Grid item xs={12} md={4} key={template.id}>
              <TemplateCard template={template} featured />
            </Grid>
          ))}
        </Grid>

        {/* Category Tabs */}
        <Paper sx={{ mb: 4 }}>
          <Tabs
            value={selectedCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ px: 2 }}
          >
            {templateCategories.map((category) => (
              <Tab
                key={category.id}
                value={category.id}
                label={category.label}
                icon={category.icon}
                iconPosition="start"
                sx={{ minHeight: 60 }}
              />
            ))}
          </Tabs>
        </Paper>

        {/* Templates Grid */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Tất cả Templates ({filteredTemplates.length})
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="outlined" size="small">
              Mới nhất
            </Button>
            <Button variant="outlined" size="small">
              Phổ biến nhất
            </Button>
            <Button variant="outlined" size="small">
              Đánh giá cao
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {filteredTemplates.map((template) => (
            <Grid item xs={12} sm={6} md={4} key={template.id}>
              <TemplateCard template={template} />
            </Grid>
          ))}
        </Grid>

        {filteredTemplates.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              Không tìm thấy template nào phù hợp
            </Typography>
            <Button variant="contained" sx={{ mt: 2 }} startIcon={<Add />}>
              Tạo template mới
            </Button>
          </Box>
        )}
      </Container>

      {/* Template Detail Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedTemplate && (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                }}
              >
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                    {selectedTemplate.title}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: "#0079bf" }}>
                      {selectedTemplate.authorAvatar}
                    </Avatar>
                    <Typography variant="body2" color="text.secondary">
                      Tạo bởi {selectedTemplate.author}
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  onClick={() => toggleFavorite(selectedTemplate.id)}
                  sx={{
                    color: favorites.has(selectedTemplate.id)
                      ? "#ff4757"
                      : "inherit",
                  }}
                >
                  {favorites.has(selectedTemplate.id) ? (
                    <Favorite />
                  ) : (
                    <FavoriteBorder />
                  )}
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 3 }}>
                <img
                  src={selectedTemplate.image}
                  alt={selectedTemplate.title}
                  style={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              </Box>

              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                {selectedTemplate.description}
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                {selectedTemplate.tags.map((tag, index) => (
                  <Chip key={index} label={tag} variant="outlined" />
                ))}
              </Box>

              <Divider sx={{ my: 3 }} />

              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Đánh giá
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Rating
                      value={selectedTemplate.rating}
                      precision={0.1}
                      readOnly
                    />
                    <Typography variant="body2">
                      {selectedTemplate.rating}/5
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Lượt sử dụng
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {selectedTemplate.uses.toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 3, pt: 0 }}>
              <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
              <Button variant="outlined" startIcon={<ContentCopy />}>
                Sao chép
              </Button>
              <Button variant="contained" startIcon={<Launch />}>
                Sử dụng Template
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          bgcolor: "#0079bf",
          "&:hover": { bgcolor: "#005a8b" },
        }}
        onClick={() => {
          /* Handle create new template */
        }}
      >
        <Add />
      </Fab>
    </Box>
  );
}
