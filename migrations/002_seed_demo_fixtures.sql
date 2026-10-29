-- MANG_04 Canonical Seed Migration 002
-- Label: DEMO_SYNTHETIC fixtures for executive review
-- Conforms to: NON-NEGOTIABLE PRINCIPLES (Never present synthetic values as live company facts)

-- 1. Key Resources
INSERT INTO key_resources (id, code, name_fa, name_en, category, criticality_level) VALUES
('kr-test-bench', 'KR-01', 'ایستگاه آزمون فشار قوی', 'High-Voltage Testing Bench', 'تجهیزات آزمون', 'CRITICAL'),
('kr-stator-winding', 'KR-02', 'ماشین سیم‌پچی استاتور', 'Stator Winding Machine', 'خطوط ساخت', 'HIGH'),
('kr-vpi-oven', 'KR-03', 'کوره لاک‌زنی و VPI', 'VPI & Varnish Oven', 'تجهیزات حرارتی', 'HIGH'),
('kr-busduct-line', 'KR-04', 'خط مونتاژ باس داکت', 'Busduct Assembly Line', 'مونتاژ', 'MEDIUM'),
('kr-dyn-balance', 'KR-05', 'مرکز بالانس دینامیکی', 'Dynamic Balancing Center', 'کنترل کیفیت', 'HIGH')
ON CONFLICT (id) DO NOTHING;

-- 2. Resource Owners
INSERT INTO resource_owner_history (id, resource_id, owner_user_id, owner_name, role_title, effective_from) VALUES
('roh-01', 'kr-test-bench', 'usr-rezaei', 'مهندس رضایی', 'مدیر ایستگاه آزمون', NOW() - INTERVAL '60 days'),
('roh-02', 'kr-stator-winding', 'usr-ahmadi', 'مهندس احمدی', 'سرپرست تولید استاتور', NOW() - INTERVAL '90 days')
ON CONFLICT (id) DO NOTHING;

-- 3. Projects (marked DEMO_SYNTHETIC)
INSERT INTO projects (id, code, title_fa, title_en, customer_fa, customer_en, category, key_resource_id, responsible_owner_id, responsible_owner_name, progress_percent, progress_verification_status, status, at_risk_value_m, time_to_no_return_days, truth_class) VALUES
('p-1405', 'P-1405', 'ژنراتور نیروگاهی ۳۲۵ مگاوات', '325 MW Power Plant Generator', 'شرکت سرمایه‌گذاری نیروگاهی', 'Power Investment Co.', 'ژنراتورهای نیروگاهی', 'kr-test-bench', 'usr-rezaei', 'مهندس رضایی', 68, 'UNVERIFIED', 'critical', 1200.0, 5, 'DEMO_SYNTHETIC'),
('p-1398', 'P-1398', 'ژنراتور صنعتی سنگین ۲۵۰ مگاوات', '250 MW Heavy Industrial Generator', 'فولاد مبارکه', 'Mobarakeh Steel Co.', 'ژنراتورهای صنعتی', 'kr-stator-winding', 'usr-ahmadi', 'مهندس احمدی', 55, 'UNVERIFIED', 'critical', 850.0, 12, 'DEMO_SYNTHETIC'),
('p-1412', 'P-1412', 'موتور کششی لکوموتیو پارس', 'Pars Locomotive Traction Motor', 'راه‌آهن جمهوری اسلامی', 'National Railway Co.', 'موتور کششی', 'kr-vpi-oven', 'usr-karimi', 'مهندس کریمی', 42, 'UNVERIFIED', 'high_risk', 600.0, 28, 'DEMO_SYNTHETIC'),
('p-1395', 'P-1395', 'باس داکت فشار قوی ۴۰۰ کیلوولت', '400 kV High-Voltage Busduct', 'نیروگاه دماوند', 'Damavand Power Plant', 'باس داکت', 'kr-busduct-line', 'usr-hosseini', 'مهندس حسینی', 75, 'UNVERIFIED', 'high_risk', 400.0, 35, 'DEMO_SYNTHETIC'),
('p-1401', 'P-1401', 'توربین بادی ۲.۵ مگاوات', '2.5 MW Wind Turbine Generator', 'مزرعه بادی خواف', 'Khaf Wind Farm', 'توربین بادی', 'kr-dyn-balance', 'usr-moradi', 'مهندس مرادی', 60, 'UNVERIFIED', 'attention', 230.0, 55, 'DEMO_SYNTHETIC')
ON CONFLICT (id) DO NOTHING;
