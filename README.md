# Dispacch
Dispacch is an intelligent logistics and freight-pooling monorepo designed to optimize freight capacity, cargo route consolidation, and container utilization. It matches shipments into community-shared corridors with 3D bin packing simulations and dynamic cost sharing.

## Architecture Overview
The repository is structured as a monorepo containing three core applications:

```
dispacch/
├── apps/
│   ├── engine-py/          # Python spatial optimization & route pooling engine (FastAPI)
│   ├── api/                # Backend API gateway & business logic (Node.js / Express)
│   └── web/                # User dashboard & load visualization UI (Next.js / TypeScript)
├── package.json            # Monorepo root scripts & workspace config
└── requirements.txt        # Shared Python dependencies
```

## Components

* `apps/engine-py`: Core mathematical optimization engine. Computes volumetric cargo fits, 3D simulation packed metrics, and route compatibility based on truck types, departure windows, and container dimensions.
* `apps/api`: REST API orchestration layer managing bookings, pool state coordination, authentication, and communication with the Python solver.
* `apps/web`: Responsive frontend web application featuring an interactive optimizer dashboard, 3D container visualization, live corridor route map, dynamic cost sharing, shipment tracking, freight wallet, and multi-role operations.

## Core Engine Capabilities

* **Shared Pool Discovery (`find_shared_pools`)**: Matches freight payloads against scheduled routes along transit corridors.
* **Spare Capacity Calculation**: Dynamically computes volume and weight utilization to minimize deadhead space.
* **Cost Sharing Logic**: Calculates per-user pricing based on consumed load percentage (`your_share_pct`) with discounts up to 68% compared to single-charter options.
* **3D Bin-Packing Simulation**: Simulates container packing configurations across common freight truck dimensions with interactive isometric physics visualization.

## Running Locally

### Run Web Client:
```bash
cd apps/web
npm start
# or from root: npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run Node API Gateway:
```bash
cd apps/api
node server.js
```

### Run Python Optimization Engine:
```bash
cd apps/engine-py
python -m uvicorn main:app --reload --port 8000
```
