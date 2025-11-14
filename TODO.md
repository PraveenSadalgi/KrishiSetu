# Realtime Dashboard Implementation

## Overview
Implement realtime updates for all farmer dashboard features using Supabase subscriptions.

## Components to Update

### 1. RecentBookings Component
- **Current State**: Fetches bookings on mount
- **Realtime Changes**:
  - Subscribe to `equipment_bookings` table
  - Listen for INSERT/UPDATE/DELETE where `owner_id` or `renter_id` matches user
  - Update bookings list in realtime

### 2. EquipmentOverview Component
- **Current State**: Static mock data
- **Realtime Changes**:
  - Fetch user's equipment from `equipment` table
  - Subscribe to `equipment` table for changes where `owner_id` matches user
  - Update equipment list in realtime
  - Handle status changes (rented/available/maintenance)

### 3. DashboardStats Component
- **Current State**: Static mock data
- **Realtime Changes**:
  - Calculate stats from bookings and equipment data
  - Subscribe to both `equipment_bookings` and `equipment` tables
  - Update stats in realtime when data changes

### 4. EarningsChart Component
- **Current State**: Static mock data
- **Realtime Changes**:
  - Fetch booking history for earnings calculation
  - Subscribe to `equipment_bookings` table
  - Update chart data in realtime

## Implementation Steps

### Phase 1: RecentBookings Realtime
- [ ] Add supabase import
- [ ] Add subscription in useEffect
- [ ] Handle realtime events (INSERT, UPDATE, DELETE)
- [ ] Update state and re-render

### Phase 2: EquipmentOverview Realtime
- [ ] Replace static data with API call to equipmentService.getUserEquipment()
- [ ] Add subscription to equipment table
- [ ] Handle realtime updates for equipment changes
- [ ] Update status indicators

### Phase 3: DashboardStats Realtime
- [ ] Create function to calculate stats from bookings/equipment
- [ ] Add subscriptions to both tables
- [ ] Update stats on realtime events
- [ ] Handle complex calculations (earnings, active bookings, etc.)

### Phase 4: EarningsChart Realtime
- [ ] Fetch booking data for chart
- [ ] Add subscription to equipment_bookings
- [ ] Update chart data and calculations
- [ ] Handle monthly aggregation

## Technical Details

### Subscription Pattern
```javascript
const subscription = supabase
  .channel('realtime-updates')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'table_name',
    filter: `owner_id=eq.${user.id}`
  }, (payload) => {
    // Handle event
  })
  .subscribe()
```

### Cleanup
- Unsubscribe in useEffect cleanup function
- Handle component unmount

### Error Handling
- Handle subscription errors
- Fallback to polling if realtime fails
- Show connection status indicators

## Testing
- [ ] Test INSERT operations (new bookings/equipment)
- [ ] Test UPDATE operations (status changes)
- [ ] Test DELETE operations
- [ ] Test multiple users simultaneously
- [ ] Test network disconnection/reconnection
