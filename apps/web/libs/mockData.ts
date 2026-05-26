export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed';
  customer_email: string;
  created_at: string;
}

export const mockTransactions: Transaction[] = [
  { id: 'tx_1', amount: 299.99, currency: 'USD', status: 'completed', customer_email: 'alice@example.com', created_at: new Date().toISOString() },
  { id: 'tx_2', amount: 49.99, currency: 'USD', status: 'completed', customer_email: 'bob@example.com', created_at: new Date(Date.now() - 3600000).toISOString() },
  { id: 'tx_3', amount: 1299.00, currency: 'USD', status: 'pending', customer_email: 'charlie@example.com', created_at: new Date(Date.now() - 7200000).toISOString() },
  { id: 'tx_4', amount: 19.99, currency: 'USD', status: 'failed', customer_email: 'diana@example.com', created_at: new Date(Date.now() - 86400000).toISOString() },
  { id: 'tx_5', amount: 499.99, currency: 'USD', status: 'completed', customer_email: 'eve@example.com', created_at: new Date(Date.now() - 172800000).toISOString() },
];

export const mockAnalytics = {
  totalVolume: 1254300,
  successRate: 99.2,
  activeUsers: 2847,
  avgTransaction: 445.20,
  volumeData: [
    { date: 'Mon', volume: 12500 },
    { date: 'Tue', volume: 18200 },
    { date: 'Wed', volume: 15900 },
    { date: 'Thu', volume: 21000 },
    { date: 'Fri', volume: 23800 },
    { date: 'Sat', volume: 14500 },
    { date: 'Sun', volume: 9800 },
  ],
  regionData: [
    { region: 'North America', value: 45 },
    { region: 'Europe', value: 30 },
    { region: 'Asia', value: 15 },
    { region: 'Other', value: 10 },
  ],
};