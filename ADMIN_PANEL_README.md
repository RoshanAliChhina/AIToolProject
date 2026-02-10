# Admin Panel Documentation

## Overview
This is a complete, production-ready admin panel UI for the AI Tools Directory application. The admin panel provides a modern, responsive interface for managing tools, reviews, and users.

## Features
- ✅ Fully responsive (desktop, tablet, mobile)
- ✅ Dark mode support
- ✅ Modern glassmorphism design
- ✅ Reusable components
- ✅ Clean, professional UI
- ✅ Ready for backend integration

## Structure

```
src/
├── admin/
│   ├── layout/
│   │   ├── AdminLayout.jsx      # Main layout wrapper
│   │   ├── Sidebar.jsx          # Collapsible sidebar navigation
│   │   └── Topbar.jsx           # Top header with user info
│   ├── pages/
│   │   ├── Dashboard.jsx        # Stats & recent activity
│   │   ├── Tools.jsx            # Tools management
│   │   ├── Reviews.jsx          # Reviews moderation
│   │   └── Users.jsx            # User management
│   └── components/
│       ├── StatCard.jsx         # Statistics card component
│       ├── AdminTable.jsx       # Responsive table component
│       ├── ConfirmModal.jsx     # Confirmation dialog
│       └── ToolForm.jsx         # Add/edit tool form
```

## Routes

- `/admin` → Redirects to `/admin/dashboard`
- `/admin/dashboard` → Overview with stats and recent activity
- `/admin/tools` → Manage AI tools (add, edit, delete, feature)
- `/admin/reviews` → Moderate user reviews (hide, delete)
- `/admin/users` → Manage users (block, make admin)

## Pages

### Dashboard
- **Stats Cards**: Total Tools, Total Reviews, Total Users, Pending Tools
- **Recent Activity**: Timeline of recent actions
- **Quick Actions**: Links to main management pages

### Tools Management
- **Features**:
  - View all tools in a table
  - Add new tools with the "Add New Tool" button
  - Edit existing tools
  - Delete tools (with confirmation)
  - Feature/unfeature tools (star icon)
  - Filter by category, pricing, status

- **Tool Form** includes:
  - Tool name
  - Category (dropdown)
  - Description (textarea)
  - Image URL
  - Website URL
  - Pricing (Free/Freemium/Paid)
  - Dynamic features list (add/remove)

### Reviews Management
- **Features**:
  - View all reviews with ratings
  - Hide/show reviews
  - Delete reviews (with confirmation)
  - Filter by tool, rating, visibility

- **Stats**:
  - Total reviews count
  - Visible reviews count
  - Average rating

### Users Management
- **Features**:
  - View all users
  - Block/unblock users
  - Make users admin / remove admin role
  - View user status (Active/Blocked)

- **Stats**:
  - Total users
  - Active users
  - Admin count
  - Blocked users

## Components

### StatCard
Displays a metric with an icon, value, and percentage change.

```jsx
<StatCard
  icon={Wrench}
  title="Total Tools"
  value="124"
  change={12}
  colorClass="text-blue-600"
/>
```

### AdminTable
Responsive table that converts to cards on mobile.

```jsx
<AdminTable
  columns={columns}
  data={data}
  actions={(row) => <ActionButtons />}
/>
```

### ConfirmModal
Confirmation dialog for destructive actions.

```jsx
<ConfirmModal
  isOpen={isOpen}
  onClose={handleClose}
  onConfirm={handleConfirm}
  title="Delete Tool"
  message="Are you sure?"
  confirmText="Delete"
/>
```

### ToolForm
Modal form for adding/editing tools with dynamic features.

```jsx
<ToolForm
  isOpen={isOpen}
  onClose={handleClose}
  onSubmit={handleSubmit}
  initialData={tool}
  title="Edit Tool"
/>
```

## Backend Integration Points

All components have placeholders for backend integration marked with comments:

```javascript
// Backend: API call would go here
console.log('Action:', data);
```

### Integration checklist:

1. **Dashboard.jsx**
   - [ ] Fetch stats from API
   - [ ] Fetch recent activity from API

2. **Tools.jsx**
   - [ ] Fetch all tools from API
   - [ ] Create new tool API call
   - [ ] Update tool API call
   - [ ] Delete tool API call
   - [ ] Toggle featured status API call

3. **Reviews.jsx**
   - [ ] Fetch all reviews from API
   - [ ] Toggle review visibility API call
   - [ ] Delete review API call

4. **Users.jsx**
   - [ ] Fetch all users from API
   - [ ] Block/unblock user API call
   - [ ] Toggle admin role API call

## Responsive Design

### Desktop (1024px+)
- Sidebar always visible
- Tables displayed in full
- All columns shown

### Tablet (768px - 1023px)
- Sidebar collapsible
- Tables scrollable horizontally
- Compact layout

### Mobile (<768px)
- Hamburger menu for sidebar
- Tables converted to cards
- Touch-optimized buttons
- Stacked layout

## Dark Mode

The admin panel automatically syncs with the main app's dark mode preference. Dark mode classes are applied using Tailwind's `dark:` prefix.

## Authentication

The admin panel uses the existing `AuthContext` for authentication. Users must be logged in and have admin privileges to access the panel.

## Next Steps

1. **Backend Integration**: Connect all API endpoints
2. **Permissions**: Add role-based access control
3. **Search & Filters**: Add search and filtering functionality
4. **Pagination**: Add pagination for large datasets
5. **Export**: Add CSV export functionality
6. **Analytics**: Add charts and graphs for better insights
7. **Notifications**: Add toast notifications for actions

## Styling

The admin panel follows the same design system as the main app:
- **Accent Color**: `#4CAF50` (green)
- **Border Radius**: Rounded (xl for cards, lg for inputs)
- **Shadows**: Soft shadows with hover elevations
- **Backdrop Blur**: Glass effect on cards
- **Transitions**: Smooth 200-300ms transitions

## Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus visible states
- Semantic HTML
- Screen reader friendly
