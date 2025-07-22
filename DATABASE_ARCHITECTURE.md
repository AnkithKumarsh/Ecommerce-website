# AKStyleHub E-commerce Database Architecture & Seller Management System

## 📊 Database Schema Design

### Core Tables Structure

#### 1. **Users Table**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  role ENUM('customer', 'seller', 'admin') DEFAULT 'customer',
  avatar_url TEXT,
  email_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 2. **Sellers Table**
```sql
CREATE TABLE sellers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  business_name VARCHAR(255) NOT NULL,
  business_type VARCHAR(100),
  gst_number VARCHAR(15),
  pan_number VARCHAR(10),
  business_address TEXT,
  business_phone VARCHAR(20),
  business_email VARCHAR(255),
  bank_account_number VARCHAR(20),
  bank_ifsc_code VARCHAR(11),
  bank_account_holder VARCHAR(255),
  commission_rate DECIMAL(5,2) DEFAULT 10.00,
  status ENUM('pending', 'approved', 'suspended', 'rejected') DEFAULT 'pending',
  verification_documents JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 3. **Categories Table**
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  parent_id UUID REFERENCES categories(id),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 4. **Products Table**
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID REFERENCES sellers(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  brand VARCHAR(100),
  sku VARCHAR(100) UNIQUE,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  cost_price DECIMAL(10,2),
  stock_quantity INTEGER DEFAULT 0,
  min_stock_level INTEGER DEFAULT 5,
  weight DECIMAL(8,2),
  dimensions JSONB, -- {length, width, height}
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  status ENUM('draft', 'pending', 'approved', 'rejected') DEFAULT 'draft',
  seo_title VARCHAR(255),
  seo_description TEXT,
  seo_keywords TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 5. **Product Variants Table**
```sql
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  size VARCHAR(50),
  color VARCHAR(50),
  material VARCHAR(100),
  sku VARCHAR(100) UNIQUE,
  price DECIMAL(10,2),
  stock_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 6. **Product Images Table**
```sql
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(255),
  sort_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 7. **Orders Table**
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  status ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded') DEFAULT 'pending',
  payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
  payment_method VARCHAR(50),
  payment_id VARCHAR(255),
  subtotal DECIMAL(10,2) NOT NULL,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  shipping_amount DECIMAL(10,2) DEFAULT 0,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'INR',
  shipping_address JSONB NOT NULL,
  billing_address JSONB,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 8. **Order Items Table**
```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  variant_id UUID REFERENCES product_variants(id),
  seller_id UUID REFERENCES sellers(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  commission_rate DECIMAL(5,2),
  commission_amount DECIMAL(10,2),
  product_snapshot JSONB, -- Store product details at time of order
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🏪 Seller Management System

### Seller Registration & Onboarding

#### 1. **Registration Process**
```typescript
interface SellerRegistration {
  // Personal Details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Business Details
  businessName: string;
  businessType: 'individual' | 'partnership' | 'company' | 'llp';
  gstNumber?: string;
  panNumber: string;
  
  // Address
  businessAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  
  // Banking Details
  bankDetails: {
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
    bankName: string;
  };
  
  // Documents
  documents: {
    panCard: File;
    gstCertificate?: File;
    bankStatement: File;
    businessProof: File;
    addressProof: File;
  };
}
```

#### 2. **Verification Workflow**
```typescript
enum SellerStatus {
  PENDING = 'pending',
  UNDER_REVIEW = 'under_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  SUSPENDED = 'suspended'
}

interface VerificationStep {
  step: string;
  status: 'pending' | 'completed' | 'failed';
  message?: string;
  completedAt?: Date;
}
```

### Seller Dashboard Features

#### 1. **Product Management**
- **Add New Products**: Form with all product details, variants, images
- **Bulk Upload**: CSV/Excel import for multiple products
- **Inventory Management**: Stock tracking, low stock alerts
- **Product Analytics**: Views, clicks, conversion rates

#### 2. **Order Management**
- **Order Processing**: View, confirm, ship orders
- **Order Status Updates**: Real-time status tracking
- **Shipping Integration**: Generate shipping labels, track packages
- **Return/Refund Management**: Handle customer returns

#### 3. **Financial Dashboard**
- **Sales Analytics**: Revenue, profit, trends
- **Commission Tracking**: Platform fees, net earnings
- **Payout Management**: Payment schedules, transaction history
- **Tax Reports**: GST reports, income statements

#### 4. **Performance Metrics**
- **Seller Rating**: Customer feedback, review management
- **Performance Score**: Based on delivery time, quality, service
- **Sales Targets**: Monthly/quarterly goals and achievements

## 🔧 Technical Implementation

### Backend API Structure

#### 1. **Seller Authentication & Authorization**
```typescript
// Middleware for seller-only routes
const requireSeller = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  if (!user || user.role !== 'seller') {
    return res.status(403).json({ error: 'Seller access required' });
  }
  
  const seller = await getSeller(user.id);
  if (!seller || seller.status !== 'approved') {
    return res.status(403).json({ error: 'Seller not approved' });
  }
  
  req.seller = seller;
  next();
};
```

#### 2. **Product Management APIs**
```typescript
// POST /api/seller/products
const createProduct = async (req: Request, res: Response) => {
  const sellerId = req.seller.id;
  const productData = req.body;
  
  // Validate product data
  const validation = validateProductData(productData);
  if (!validation.isValid) {
    return res.status(400).json({ errors: validation.errors });
  }
  
  // Create product with pending status
  const product = await createProductWithVariants({
    ...productData,
    sellerId,
    status: 'pending'
  });
  
  // Upload images
  if (req.files) {
    await uploadProductImages(product.id, req.files);
  }
  
  res.status(201).json({ product });
};

// GET /api/seller/products
const getSellerProducts = async (req: Request, res: Response) => {
  const sellerId = req.seller.id;
  const { page = 1, limit = 20, status, category } = req.query;
  
  const products = await getProductsBySeller(sellerId, {
    page: Number(page),
    limit: Number(limit),
    status,
    category
  });
  
  res.json({ products });
};
```

#### 3. **Order Management APIs**
```typescript
// GET /api/seller/orders
const getSellerOrders = async (req: Request, res: Response) => {
  const sellerId = req.seller.id;
  const { status, dateFrom, dateTo } = req.query;
  
  const orders = await getOrdersBySeller(sellerId, {
    status,
    dateFrom,
    dateTo
  });
  
  res.json({ orders });
};

// PUT /api/seller/orders/:orderId/status
const updateOrderStatus = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const { status, trackingNumber } = req.body;
  const sellerId = req.seller.id;
  
  // Verify order belongs to seller
  const order = await getOrderItem(orderId, sellerId);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  await updateOrderItemStatus(orderId, status, {
    trackingNumber,
    updatedBy: sellerId
  });
  
  // Send notification to customer
  await sendOrderStatusNotification(order.userId, orderId, status);
  
  res.json({ success: true });
};
```

### Frontend Seller Dashboard

#### 1. **Dashboard Layout**
```typescript
const SellerDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <SellerSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <SellerHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <Routes>
              <Route path="/" element={<DashboardOverview />} />
              <Route path="/products" element={<ProductManagement />} />
              <Route path="/orders" element={<OrderManagement />} />
              <Route path="/analytics" element={<SellerAnalytics />} />
              <Route path="/settings" element={<SellerSettings />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};
```

#### 2. **Product Management Component**
```typescript
const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const handleAddProduct = () => {
    // Open product creation modal/form
  };
  
  const handleEditProduct = (productId: string) => {
    // Navigate to product edit page
  };
  
  const handleToggleStatus = async (productId: string, isActive: boolean) => {
    await updateProductStatus(productId, isActive);
    // Refresh products list
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <button onClick={handleAddProduct} className="btn-primary">
          Add New Product
        </button>
      </div>
      
      <ProductFilters />
      <ProductTable 
        products={products}
        onEdit={handleEditProduct}
        onToggleStatus={handleToggleStatus}
      />
    </div>
  );
};
```

## 📈 Business Logic & Features

### Commission & Pricing Model
- **Commission Structure**: 5-15% based on category and seller tier
- **Dynamic Pricing**: Sellers can set prices, platform suggests optimal pricing
- **Bulk Discounts**: Volume-based pricing for large orders

### Quality Control
- **Product Approval**: Manual review for new products
- **Quality Ratings**: Customer feedback affects seller score
- **Return Management**: Automated return processing

### Analytics & Reporting
- **Real-time Dashboard**: Sales, inventory, performance metrics
- **Predictive Analytics**: Demand forecasting, inventory optimization
- **Financial Reports**: Automated tax calculations, profit analysis

This comprehensive system provides a complete e-commerce platform where sellers can easily manage their business while maintaining quality standards and providing excellent customer experience.