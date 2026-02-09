# Skoolar - Students Social Platform

A fully functional students social app built with Next.js 14, featuring organizations, opportunities, groups, posts, messaging, and social networking.

## Features

### 🔐 Authentication & Authorization
- **Sign Up / Sign In**: User registration and authentication
- **Onboarding**: New user onboarding flow
- **Protected Routes**: Middleware-based route protection
- **Guest Access**: Public pages for non-authenticated users

### 🎓 Organizations
- **Create Organizations**: Schools, universities, companies, non-profits
- **Organization Profiles**: Detailed org information and branding
- **Member Management**: Add/remove members, assign roles (admin, moderator, member)
- **Organization Posts**: Orgs can create posts visible to followers

#### Organization Routes
- `/orgs` - Browse all organizations
- `/orgs/create` - Create new organization (protected)
- `/orgs/[id]` - Organization profile page (public)
- `/orgs/[id]/edit` - Edit organization (protected, admin only)
- `/orgs/[id]/members` - View organization members (protected)
- `/orgs/[id]/opportunities` - Organization's opportunities (public)

### 💼 Opportunities
- **Job Postings**: Full-time, part-time, contract positions
- **Internships**: Summer/winter internship programs
- **Scholarships**: Financial aid opportunities
- **Campus Placements**: On-campus recruitment drives

#### Opportunity Routes
- `/opportunities` - Browse all opportunities (public)
- `/opportunities/create` - Post new opportunity (protected)
- `/opportunities/[id]` - Opportunity details (public)

### 📝 Posts & Feed
- **Create Posts**: Text, articles, questions, achievements
- **Feed**: Personalized content feed (protected)
- **Explore**: Browse public posts (public)
- **Like & Comment**: Engage with posts
- **Tagging**: Tag posts with relevant topics

#### Post Routes
- `/feed` - Personal feed (protected)
- `/explore` - Public post discovery (public)
- `/posts/create` - Create new post (protected)
- `/posts/[id]` - View post details (public)
- `/posts/[id]/edit` - Edit post (protected, author only)

### 👥 Groups & Communities
- **Public Groups**: Open to all users
- **Private Groups**: Invitation or approval required
- **Group Chat**: Real-time messaging within groups
- **Group Posts**: Share content within specific groups
- **Member Management**: Admins can manage members and roles

#### Group Routes
- `/groups` - Browse all groups (public/protected)
- `/groups/create` - Create new group (protected)
- `/groups/[id]` - Group details and posts (varies by privacy)
- `/groups/[id]/chat` - Group chat room (members only)
- `/groups/[id]/members` - View group members (varies by privacy)

### 💬 Messaging
- **Direct Messages**: 1-on-1 private messaging
- **Real-time Chat**: Instant message delivery
- **Conversation History**: Access past conversations
- **New Conversations**: Start messaging any user

#### Messaging Routes
- `/messages` - All conversations (protected)
- `/messages/new` - Start new conversation (protected)
- `/messages/[userId]` - Chat with specific user (protected)

### 👤 User Profiles & Social
- **User Profiles**: Detailed user information, bio, links
- **Follow System**: Follow/unfollow other users
- **Followers/Following**: View social connections
- **Profile Editing**: Update personal information
- **Activity Feed**: View user's posts and activity

#### Profile Routes
- `/profile` - Current user's profile (protected)
- `/profile/edit` - Edit own profile (protected)
- `/users/[id]` - View any user's profile (public)
- `/users/[id]/followers` - View user's followers (public)
- `/users/[id]/following` - View who user follows (public)

### 🌐 Public Pages (Guest Access)
- Landing page with features overview
- Browse opportunities
- View organization profiles
- Explore public posts
- View user profiles
- Browse public groups

## Route Structure

```
/
├── page.tsx                          # Landing page (public)
├── explore/
│   └── page.tsx                      # Explore posts (public)
├── auth/
│   ├── signin/
│   │   └── page.tsx                  # Sign in (public)
│   ├── signup/
│   │   └── page.tsx                  # Sign up (public)
│   └── onboarding/
│       └── page.tsx                  # Onboarding (protected)
├── (platform)/                       # Protected layout
│   ├── feed/
│   │   └── page.tsx                  # Personal feed
│   ├── communities/
│   │   ├── page.tsx                  # Communities list
│   │   └── [id]/
│   │       └── page.tsx              # Community detail
│   ├── enroll/
│   │   └── page.tsx                  # Enrollment
│   ├── opportunities/
│   │   └── page.tsx                  # Opportunities (protected view)
│   ├── orgs/
│   │   └── create/
│   │       └── page.tsx              # Create org
│   ├── posts/
│   │   └── create/
│   │       └── page.tsx              # Create post
│   └── schools/
│       └── register/
│           └── page.tsx              # Register school
├── orgs/
│   ├── page.tsx                      # Organizations list (public)
│   ├── [id]/
│   │   ├── page.tsx                  # Org profile (public)
│   │   ├── edit/
│   │   │   └── page.tsx              # Edit org (protected)
│   │   ├── members/
│   │   │   └── page.tsx              # Org members (protected)
│   │   └── opportunities/
│   │       └── page.tsx              # Org opportunities (public)
├── opportunities/
│   ├── page.tsx                      # Browse opportunities (public)
│   ├── create/
│   │   └── page.tsx                  # Create opportunity (protected)
│   └── [id]/
│       └── page.tsx                  # Opportunity detail (public)
├── posts/
│   └── [id]/
│       └── page.tsx                  # Post detail (public)
├── groups/
│   ├── page.tsx                      # Browse groups (public)
│   ├── create/
│   │   └── page.tsx                  # Create group (protected)
│   └── [id]/
│       ├── page.tsx                  # Group detail (varies)
│       ├── chat/
│       │   └── page.tsx              # Group chat (members only)
│       └── members/
│           └── page.tsx              # Group members (varies)
├── messages/
│   ├── page.tsx                      # Conversations list (protected)
│   ├── new/
│   │   └── page.tsx                  # New message (protected)
│   └── [userId]/
│       └── page.tsx                  # Chat with user (protected)
├── users/
│   └── [id]/
│       ├── page.tsx                  # User profile (public)
│       ├── followers/
│       │   └── page.tsx              # User's followers (public)
│       └── following/
│           └── page.tsx              # User's following (public)
└── profile/
    ├── page.tsx                      # Own profile (protected)
    └── edit/
        └── page.tsx                  # Edit profile (protected)
```

## Database Schema

The app uses Prisma with PostgreSQL. Key models include:

- **Profile**: User profiles with bio, links, and social info
- **Organization**: Schools, companies, and other orgs
- **Opportunity**: Internships, jobs, scholarships, placements
- **Post**: User-generated content with types and tags
- **Group**: Public and private communities
- **DirectMessage**: 1-on-1 messaging
- **CommunityMessage**: Group chat messages
- **Follow**: User follow relationships
- **PostLike**: Post engagement
- **Comment**: Post comments

See `prisma/schema.prisma` for full schema details.

## Middleware & Route Protection

The app uses Next.js middleware to protect routes:

- **Protected Routes** (`/profile`, `/messages`, `/feed`, etc.): Require authentication
- **Guest Routes** (`/auth/*`): Automatically redirect to feed if authenticated
- **Public Routes** (`/`, `/explore`, `/orgs`, `/users`, `/posts/[id]`): Accessible to everyone
- **Conditional Routes** (`/groups/[id]`, `/opportunities`): Access varies by resource privacy settings

## Getting Started

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Supabase credentials:
   ```
   DATABASE_URL="postgresql://..."
   DIRECT_URL="postgresql://..."
   NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
   ```

3. **Run database migrations:**
   ```bash
   pnpm prisma migrate dev
   ```

4. **Start the development server:**
   ```bash
   pnpm dev
   ```

5. **Open your browser:**
   ```
   http://localhost:3000
   ```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime (for chat)

## Key Features by User Type

### Guest Users Can:
- View landing page
- Browse public posts and opportunities
- View organization profiles
- View user profiles
- Explore groups (public)

### Authenticated Users Can:
- All guest features +
- Create and manage organizations
- Post opportunities
- Create posts in feed
- Join and create groups
- Send direct messages
- Follow other users
- Like and comment on posts
- Full profile management

### Organization Admins Can:
- All member features +
- Manage organization details
- Add/remove members
- Assign roles
- Post on behalf of organization

### Group Admins Can:
- All member features +
- Manage group settings
- Moderate members
- Manage group posts
- Control privacy settings

## Next Steps (TODO)

Backend implementation required for:
- [ ] Supabase auth integration
- [ ] API routes for CRUD operations
- [ ] Real-time chat with Supabase Realtime
- [ ] File uploads for avatars and media
- [ ] Search functionality
- [ ] Notifications system
- [ ] Email invitations
- [ ] Application/enrollment workflows
- [ ] Analytics dashboard
- [ ] Moderation tools

## License

MIT