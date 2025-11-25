(() => {
    
    const orders = [
        { id: 101, customer: 'Alice', items: 2, total: 49.98, status: 'Completed', date: new Date('2025-11-20') },
        { id: 102, customer: 'Bob', items: 1, total: 19.99, status: 'Processing', date: new Date('2025-11-22') },
        { id: 103, customer: 'Cara', items: 3, total: 79.50, status: 'Pending', date: new Date('2025-11-25') },
        { id: 104, customer: 'philip', items: 3, total: 79.50, status: 'Pending', date: new Date('2025-11-25') },
    ];
    

   
    const statOrders = document.getElementById('statOrders');
    const statRevenue = document.getElementById('statRevenue');
    const statCustomers = document.getElementById('statCustomers');
    const statProducts = document.getElementById('statProducts');
    const ordersTableBody = document.querySelector('#ordersTable tbody');
    const recentOrders = document.getElementById('recentOrders');
    const addSampleOrder = document.getElementById('addSampleOrder');
    const btnToggle = document.getElementById('btnToggleSidebar');
    const btnClose = document.getElementById('btnCloseSidebar');
    const sidebar = document.getElementById('sidebar');
    const yearEl = document.getElementById('year');

    
    function updateStats() {
        statOrders.textContent = orders.length;
        const revenue = orders.reduce((s, o) => s + Number(o.total), 0);
        statRevenue.textContent = '$' + revenue.toFixed(2);
        const customers = new Set(orders.map(o => o.customer)).size;
        statCustomers.textContent = customers;
        statProducts.textContent = 12; // simple fixed value for beginner
    }

    function renderTable() {
        ordersTableBody.innerHTML = orders.map(o => `
      <tr>
        <td>#${o.id}</td>
        <td>${o.customer}</td>
        <td>${o.items}</td>
        <td>$${Number(o.total).toFixed(2)}</td>
        <td><span class="badge bg-${o.status === 'Completed' ? 'success' : o.status === 'Processing' ? 'info' : 'secondary'}">${o.status}</span></td>
        <td>${o.date.toLocaleDateString()}</td>
      </tr>
    `).join('');
    }

   
    function renderRecent() {
        recentOrders.innerHTML = orders.slice(0, 4).map(o => `
      <li class="list-group-item d-flex justify-content-between align-items-start">
        <div>
          <div class="fw-bold">#${o.id} — ${o.customer}</div>
          <small class="text-muted">${o.items} items</small>
        </div>
        <div class="text-end">
          <div class="small">$${Number(o.total).toFixed(2)}</div>
          <span class="badge bg-${o.status === 'Completed' ? 'success' : 'secondary'}">${o.status}</span>
        </div>
      </li>
    `).join('');
    }

    
    addSampleOrder?.addEventListener('click', () => {
        const next = (orders[0]?.id || 100) + 1;
        const newOrder = { id: next, customer: 'New Customer', items: 1, total: 29.99, status: 'Pending', date: new Date() };
        orders.unshift(newOrder);
        updateStats();
        renderTable();
        renderRecent();
        alert('Added a sample order (for learning).');
    });

    
    btnToggle?.addEventListener('click', () => sidebar.classList.toggle('open'));
    btnClose?.addEventListener('click', () => sidebar.classList.remove('open'));

    
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    
    updateStats();
    renderTable();
    renderRecent();
})();
