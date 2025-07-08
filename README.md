📄 Description
EmpowerDashboard Frontend is a responsive, interactive admin dashboard interface built with React, TypeScript, Tailwind CSS, and Recharts. It is designed to visualize and manage employee data fetched from a secure backend (Dashboard-Backend).
This platform provides HR/Admin users with capabilities to add employees, view statistics, and analyze trends through dynamic UI components and real-time charts.

🔗 Backend Repo: Dashboard-Backend

✨ Key Features
👤 Add New Employees (form with validation and toast notifications)

📊 Dashboard with Real-Time Stats:

Total Employees, Active Today, On Leave

Average Salary, Department Count

📈 Advanced Analytics:

Monthly Hiring Trends

Salary Growth Over Years

Department Distribution (Pie Chart)

Employee Satisfaction & Performance (Area Charts)

📱 Fully Responsive Layout

🎨 Elegant UI using ShadCN + Tailwind CSS + Lucide Icons

🔄 Syncs with Backend API for CRUD operations

🧱 Tech Stack
Technology	Purpose
React	UI Framework
TypeScript	Type safety and better tooling
Tailwind CSS	Utility-first CSS styling
Recharts	Data Visualization & Analytics
Lucide Icons	Beautiful, open-source icons
Axios	HTTP requests to backend API
ShadCN UI	Beautiful UI components

📁 Project Structure
src/
│
├── components/            # Reusable UI components
├── features/
│   ├── AddEmployeeForm.tsx      # Form to add new employees
│   ├── DashboardStats.tsx       # Stat boxes
│   └── AnalyticsCharts.tsx      # Recharts visualizations
├── hooks/                # Custom hooks (e.g. toast)
├── pages/                # Page-level components
├── App.tsx               # Entry component
├── index.tsx             # React DOM mount
📦 Getting Started
1. Clone the Repository
git clone https://github.com/malahimaamir/ecommerce-dashboard.git
cd ecommerce-dashboard
2. Install Dependencies
npm install
3. Set Up Environment
Make sure your backend (Dashboard-Backend) is running on http://localhost:5000.

If needed, create a .env file for frontend variables (e.g., API base URL).

4. Start the Development Server
npm run dev
Visit: http://localhost:5173

🔗 API Integration
Method	Endpoint	Purpose
POST	/api/employees	Add new employee
GET	/api/employees	Get all employees
GET	/api/stats	Dashboard statistics
GET	/api/recent	Recently added employees
PUT	/api/employees/:id	Edit employee info
DELETE	/api/employees/:id	Remove employee

🖼️ UI Screens
📇 Add Employee Form

📌 Dashboard Stats Panel

📊 Analytics Charts

📈 Salary & Performance Insights

🙋‍♀️ Author
Malahima Amir
📧 malahimaamir@gmail.com
🔗 GitHub: @malahimaamir

