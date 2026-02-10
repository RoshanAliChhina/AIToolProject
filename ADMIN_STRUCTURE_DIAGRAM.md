```
┌─────────────────────────────────────────────────────────────┐
│                      ADMIN PANEL STRUCTURE                  │
└─────────────────────────────────────────────────────────────┘

App.jsx
  └── AdminLayout.jsx (/admin/*)
       ├── Sidebar.jsx (Left Navigation)
       │    ├── Logo & Title
       │    ├── Navigation Items
       │    │    ├── Dashboard
       │    │    ├── Tools
       │    │    ├── Reviews
       │    │    └── Users
       │    └── Logout Button
       │
       ├── Topbar.jsx (Top Header)
       │    ├── Menu Toggle (Mobile)
       │    ├── Welcome Message
       │    ├── Dark Mode Toggle
       │    └── Admin Avatar
       │
       └── <Outlet> (Page Content)
            │
            ├── Dashboard.jsx (/admin/dashboard)
            │    ├── StatCard × 4
            │    ├── Recent Activity List
            │    └── Quick Action Cards × 3
            │
            ├── Tools.jsx (/admin/tools)
            │    ├── Page Header + Add Button
            │    ├── AdminTable
            │    │    ├── Columns Config
            │    │    ├── Mock Data
            │    │    └── Action Buttons (Feature, Edit, Delete)
            │    ├── ToolForm (Modal)
            │    │    ├── Form Fields × 7
            │    │    ├── Dynamic Features List
            │    │    └── Save/Cancel Buttons
            │    └── ConfirmModal (Delete)
            │
            ├── Reviews.jsx (/admin/reviews)
            │    ├── Stats Cards × 3
            │    ├── AdminTable
            │    │    ├── Columns Config (User, Rating, Review, Tool, Status)
            │    │    └── Action Buttons (Hide, Delete)
            │    └── ConfirmModal (Delete)
            │
            └── Users.jsx (/admin/users)
                 ├── Stats Cards × 4
                 ├── AdminTable
                 │    ├── Columns Config (Name, Role, Status, Join Date)
                 │    └── Action Buttons (Make Admin, Block)
                 ├── ConfirmModal (Block/Unblock)
                 └── ConfirmModal (Make/Remove Admin)


┌─────────────────────────────────────────────────────────────┐
│                    COMPONENT RELATIONSHIPS                  │
└─────────────────────────────────────────────────────────────┘

LAYOUT COMPONENTS
┌────────────────┐
│ AdminLayout    │ Main container, handles sidebar state
│                │ & dark mode
├────────────────┤
│ - Sidebar      │ Navigation menu (collapsible)
│ - Topbar       │ Header bar (menu toggle, dark mode, user)
│ - <Outlet>     │ Renders child routes
└────────────────┘

REUSABLE COMPONENTS
┌────────────────┐
│ StatCard       │ Used by: Dashboard, Reviews, Users
│                │ Props: icon, title, value, change, colorClass
├────────────────┤
│ AdminTable     │ Used by: Tools, Reviews, Users
│                │ Props: columns, data, actions
│                │ Features: Responsive (desktop table, mobile cards)
├────────────────┤
│ ConfirmModal   │ Used by: Tools, Reviews, Users
│                │ Props: isOpen, onClose, onConfirm, title, message
│                │ Features: Customizable button text & color
├────────────────┤
│ ToolForm       │ Used by: Tools
│                │ Props: isOpen, onClose, onSubmit, initialData, title
│                │ Features: Dynamic features list, full validation-ready
└────────────────┘

PAGE COMPONENTS
┌────────────────┐
│ Dashboard      │ Overview page
│                │ Uses: StatCard
├────────────────┤
│ Tools          │ Tools CRUD page
│                │ Uses: AdminTable, ToolForm, ConfirmModal
├────────────────┤
│ Reviews        │ Reviews moderation page
│                │ Uses: AdminTable, ConfirmModal, StatCard
├────────────────┤
│ Users          │ User management page
│                │ Uses: AdminTable, ConfirmModal (×2), StatCard
└────────────────┘


┌─────────────────────────────────────────────────────────────┐
│                       DATA FLOW                             │
└─────────────────────────────────────────────────────────────┘

USER ACTION → COMPONENT → HANDLER → (Backend API) → STATE UPDATE → UI UPDATE

Example: Delete Tool
1. User clicks delete icon
   ↓
2. Tools.jsx handleDelete()
   ↓
3. Opens ConfirmModal
   ↓
4. User confirms
   ↓
5. confirmDelete() called
   ↓
6. [Backend: DELETE /api/tools/:id] ← Integration point
   ↓
7. State updated (remove tool from array)
   ↓
8. AdminTable re-renders
   ↓
9. Tool removed from UI


┌─────────────────────────────────────────────────────────────┐
│                    ROUTING STRUCTURE                        │
└─────────────────────────────────────────────────────────────┘

/admin [AdminLayout]
  │
  ├─ / (index) → Redirects to /admin/dashboard
  │
  ├─ /dashboard [Dashboard.jsx]
  │   └─ Shows stats, activity, quick actions
  │
  ├─ /tools [Tools.jsx]
  │   ├─ Table view of all tools
  │   ├─ Add/Edit modal (ToolForm)
  │   └─ Delete confirmation (ConfirmModal)
  │
  ├─ /reviews [Reviews.jsx]
  │   ├─ Table view of all reviews
  │   └─ Delete confirmation (ConfirmModal)
  │
  └─ /users [Users.jsx]
      ├─ Table view of all users
      ├─ Block/Unblock confirmation (ConfirmModal)
      └─ Make Admin confirmation (ConfirmModal)


┌─────────────────────────────────────────────────────────────┐
│                RESPONSIVE BEHAVIOR                          │
└─────────────────────────────────────────────────────────────┘

DESKTOP (>= 1024px)
┌─────────────────────────────────────────────────────────┐
│  [Sidebar]  │  [Topbar - Welcome - DarkMode - Avatar]  │
│             ├──────────────────────────────────────────┤
│  Dashboard  │                                          │
│  Tools      │                                          │
│  Reviews    │          PAGE CONTENT                    │
│  Users      │          (Full Table Layout)             │
│             │                                          │
│  Logout     │                                          │
└─────────────────────────────────────────────────────────┘

MOBILE (< 768px)
┌─────────────────────────────────────────┐
│  [☰] [DarkMode] [Avatar]                │
├─────────────────────────────────────────┤
│                                         │
│        PAGE CONTENT                     │
│        (Card Layout)                    │
│                                         │
└─────────────────────────────────────────┘
     │
     └─ [☰] Opens Sidebar Overlay


┌─────────────────────────────────────────────────────────────┐
│                    STATE MANAGEMENT                         │
└─────────────────────────────────────────────────────────────┘

AdminLayout.jsx
├─ isSidebarOpen (boolean) - Sidebar visibility (mobile)
├─ darkMode (boolean) - Dark mode preference
└─ Uses: AuthContext for user data

Dashboard.jsx
├─ stats (array) - Mock statistics
└─ recentActivity (array) - Mock activity log

Tools.jsx
├─ tools (array) - Mock tools data
├─ isToolFormOpen (boolean) - Form modal visibility
├─ isDeleteModalOpen (boolean) - Delete confirm visibility
├─ selectedTool (object) - Tool to delete
└─ editingTool (object) - Tool being edited

Reviews.jsx
├─ reviews (array) - Mock reviews data
├─ isDeleteModalOpen (boolean) - Delete confirm visibility
└─ selectedReview (object) - Review to delete

Users.jsx
├─ users (array) - Mock users data
├─ isBlockModalOpen (boolean) - Block confirm visibility
├─ isAdminModalOpen (boolean) - Admin confirm visibility
├─ selectedUser (object) - User for action
└─ actionType (string) - 'block' or 'admin'


┌─────────────────────────────────────────────────────────────┐
│                  STYLING APPROACH                           │
└─────────────────────────────────────────────────────────────┘

Tailwind CSS Classes Used:
├─ Layout: flex, grid, max-w, mx-auto, px, py
├─ Colors: bg-*, text-*, border-*
├─ Dark Mode: dark:bg-*, dark:text-*, dark:border-*
├─ Spacing: p-*, m-*, gap-*
├─ Borders: rounded-*, border-*
├─ Shadows: shadow-*, shadow-accent/*
├─ Effects: backdrop-blur-*, transition-*, hover:*
├─ Typography: text-*, font-*, tracking-*
└─ Responsive: sm:*, md:*, lg:*

Custom Design Tokens:
├─ Accent: #4CAF50
├─ Border Radius: xl (cards), lg (inputs)
├─ Shadows: Soft with 25% accent tint
├─ Transitions: 200-300ms ease
└─ Backdrop: blur-xl on cards


┌─────────────────────────────────────────────────────────────┐
│              ACCESSIBILITY FEATURES                         │
└─────────────────────────────────────────────────────────────┘

✓ ARIA Labels on all interactive elements
✓ Keyboard navigation support
✓ Focus visible states
✓ Semantic HTML (nav, main, header, article)
✓ Alt text on icons (via aria-label)
✓ Role attributes (navigation, main)
✓ Min touch target 44px (mobile)
✓ Contrast ratios meet WCAG AA standards
✓ Screen reader friendly table structure


┌─────────────────────────────────────────────────────────────┐
│                    FILE SIZES                               │
└─────────────────────────────────────────────────────────────┘

Layout Components:
├─ AdminLayout.jsx    2.7 KB
├─ Sidebar.jsx        4.7 KB
└─ Topbar.jsx         3.1 KB

Page Components:
├─ Dashboard.jsx      6.6 KB
├─ Tools.jsx          6.9 KB
├─ Reviews.jsx        7.6 KB
└─ Users.jsx          9.0 KB

Reusable Components:
├─ StatCard.jsx       1.4 KB
├─ AdminTable.jsx     4.4 KB
├─ ConfirmModal.jsx   2.7 KB
└─ ToolForm.jsx      13.3 KB

Total: ~62 KB (uncompressed)


┌─────────────────────────────────────────────────────────────┐
│                 ICON USAGE                                  │
└─────────────────────────────────────────────────────────────┘

From lucide-react:

Layout:
├─ LayoutDashboard - Logo, Dashboard nav
├─ Wrench - Tools nav, tools icon
├─ MessageSquare - Reviews nav
├─ Users - Users nav, users icon
├─ LogOut - Logout button
├─ Menu - Mobile menu toggle
├─ X - Close buttons
├─ Sun - Light mode toggle
├─ Moon - Dark mode toggle
└─ User - Admin avatar

Actions:
├─ Plus - Add new button, add feature
├─ Edit - Edit button
├─ Trash2 - Delete button
├─ Star - Featured status, ratings
├─ EyeOff - Hide review
├─ Shield - Admin badge, make admin
├─ Ban - Block user
├─ AlertTriangle - Warning in modals
├─ Clock - Time/date indicators
├─ DollarSign - Pricing
└─ Sparkles - Featured items

All icons: 5×5 default, customizable
```
