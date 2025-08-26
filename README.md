# Warehouse Inventory Management MVP

A React-based inventory management tool for warehouse instruments built with TypeScript and TailwindCSS.

## Features

### Core Functionality
- **Full CRUD Operations**: Create, Read, Update, Delete for categories, subcategories, and instruments
- **Hierarchical Organization**: Category → Subcategory → Instrument structure
- **Search & Filter**: Search by name/notes and filter by category/subcategory
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### User Interface
- **Modern Card Layout**: Clean, modern cards displaying instrument information
- **Collapsible Sidebar**: Tree view for easy navigation through categories
- **Search Bar**: Real-time search functionality
- **Filter Dropdowns**: Category and subcategory filters
- **Modal Forms**: User-friendly add/edit forms

### Data Management
- **In-Memory Storage**: All data stored in React state during session
- **Seed Data**: Pre-populated with example warehouse instruments
- **Type Safety**: Full TypeScript support

## Technology Stack

- **React 18** with TypeScript
- **TailwindCSS** for styling
- **Modern ES6+** features
- **Responsive Design** principles

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download the project
2. Navigate to the project directory:
   ```bash
   cd inventory-mvp
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

### Adding Instruments
1. Click the "Add Instrument" button in the header
2. Fill in the required fields (name, quantity, unit, category, subcategory)
3. Optionally add a photo URL and notes
4. Click "Add Instrument" to save

### Editing Instruments
1. Click the edit icon (pencil) on any instrument card
2. Modify the information as needed
3. Click "Update Instrument" to save changes

### Deleting Instruments
1. Click the delete icon (trash) on any instrument card
2. Confirm the deletion in the popup dialog

### Searching and Filtering
- Use the search bar to find instruments by name or notes
- Use the category dropdown to filter by specific categories
- Use the subcategory dropdown to filter by specific subcategories
- The sidebar tree view can also be used for navigation

### Navigation
- Use the collapsible sidebar to browse categories and subcategories
- Click on categories to expand/collapse them
- Click on subcategories to filter instruments
- The main content area shows filtered results

## Project Structure

```
src/
├── components/          # React components
│   ├── CategoryTree.tsx     # Hierarchical category navigation
│   ├── Header.tsx          # Header with search and filters
│   ├── InstrumentCard.tsx  # Individual instrument display
│   └── InstrumentForm.tsx  # Add/edit form modal
├── data/
│   └── seedData.ts         # Example data for demonstration
├── types/
│   └── index.ts            # TypeScript type definitions
├── App.tsx                 # Main application component
├── App.css                 # Custom styles
└── index.css               # TailwindCSS imports
```

## Data Structure

### Categories
- Top-level organization for instruments
- Contains multiple subcategories

### Subcategories
- Second-level organization within categories
- Contains multiple instruments

### Instruments
- Individual items with properties:
  - Name
  - Quantity (number)
  - Unit (pieces, liters, etc.)
  - Notes (optional)
  - Photo URL (optional)
  - Category and subcategory references

## Customization

### Adding New Categories
Edit the `seedData.ts` file to add new categories, subcategories, and instruments.

### Styling
The application uses TailwindCSS. Modify the classes in components or add custom CSS in `App.css`.

### Features
The modular component structure makes it easy to add new features:
- Add new filter types
- Implement sorting functionality
- Add export capabilities
- Integrate with a backend API

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## License

This project is created for demonstration purposes as an MVP inventory management system.

## Future Enhancements

Potential improvements for a production version:
- Backend API integration
- Database persistence
- User authentication
- Export functionality (PDF, Excel)
- Barcode scanning
- Stock alerts
- Audit trails
- Multi-location support
