/*
 Navicat Premium Data Transfer

 Source Server         : mydb
 Source Server Type    : PostgreSQL
 Source Server Version : 170005 (170005)
 Source Host           : localhost:5432
 Source Catalog        : maptest
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 170005 (170005)
 File Encoding         : 65001

 Date: 01/04/2026 01:13:54
*/


-- ----------------------------
-- Sequence structure for ApprovedProject_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."ApprovedProject_id_seq";
CREATE SEQUENCE "public"."ApprovedProject_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for BuildPlan_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."BuildPlan_id_seq";
CREATE SEQUENCE "public"."BuildPlan_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for BuildingControl_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."BuildingControl_id_seq";
CREATE SEQUENCE "public"."BuildingControl_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for FiscalYear_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."FiscalYear_id_seq";
CREATE SEQUENCE "public"."FiscalYear_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for Map_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Map_id_seq";
CREATE SEQUENCE "public"."Map_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for Owner_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Owner_id_seq";
CREATE SEQUENCE "public"."Owner_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for PlanProject_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."PlanProject_id_seq";
CREATE SEQUENCE "public"."PlanProject_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for RiskZone_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."RiskZone_id_seq";
CREATE SEQUENCE "public"."RiskZone_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for Uploads_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Uploads_id_seq";
CREATE SEQUENCE "public"."Uploads_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for User_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."User_id_seq";
CREATE SEQUENCE "public"."User_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for ZoningPlan_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."ZoningPlan_id_seq";
CREATE SEQUENCE "public"."ZoningPlan_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for districts_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."districts_id_seq";
CREATE SEQUENCE "public"."districts_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for ApprovedProject
-- ----------------------------
DROP TABLE IF EXISTS "public"."ApprovedProject";
CREATE TABLE "public"."ApprovedProject" (
  "id" int4 NOT NULL DEFAULT nextval('"ApprovedProject_id_seq"'::regclass),
  "title_project" text COLLATE "pg_catalog"."default" NOT NULL DEFAULT 'ยังไม่ระบุ'::text,
  "category" text COLLATE "pg_catalog"."default",
  "supervisor" text COLLATE "pg_catalog"."default",
  "budget" float8,
  "fiscalYearId" int4,
  "status" text COLLATE "pg_catalog"."default",
  "documentCount" int4,
  "details" text COLLATE "pg_catalog"."default",
  "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "user_id" int4,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Records of ApprovedProject
-- ----------------------------
INSERT INTO "public"."ApprovedProject" VALUES (7, 'Feature 102', NULL, NULL, NULL, NULL, 'อนุมัติ', NULL, NULL, '2026-03-28 20:26:30.65', NULL, '2026-03-28 20:26:30.65', '2026-03-30 11:22:25.747');
INSERT INTO "public"."ApprovedProject" VALUES (11, '996', NULL, NULL, NULL, NULL, 'อนุมัติ', NULL, NULL, '2026-03-30 11:26:20.299', NULL, '2026-03-30 11:26:20.299', '2026-03-30 11:37:28.874');

-- ----------------------------
-- Table structure for BuildPlan
-- ----------------------------
DROP TABLE IF EXISTS "public"."BuildPlan";
CREATE TABLE "public"."BuildPlan" (
  "id" int4 NOT NULL DEFAULT nextval('"BuildPlan_id_seq"'::regclass),
  "areabuild" text COLLATE "pg_catalog"."default" NOT NULL,
  "notes" text COLLATE "pg_catalog"."default",
  "user_id" int4,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Records of BuildPlan
-- ----------------------------
INSERT INTO "public"."BuildPlan" VALUES (5, 'อาคารเก่า90ปี ', NULL, NULL, '2026-03-30 18:18:05.848', '2026-03-30 18:18:05.848');
INSERT INTO "public"."BuildPlan" VALUES (6, 'อุโบสถวัดควนวิเศษ', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (7, '7-Eleven ถนนวิเศษกุล', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (8, 'ตึกแถว เลขที่ 143, 145 ถนนวิเศษกล', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (9, 'ศาลเจ้าพ่อหมื่นราม', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (10, 'ศาลเจ้าพ่อหมื่นราม', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (11, 'ศาลเจ้าพ่อหมื่นราม', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (12, 'อาคาร เลขที่ 146, 148
ถนนพระราม 6', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (13, 'บริษัท ตรังจังหวัดพาณิชย์ จำกัด', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (14, 'อาคารไม้ เลขที่ 77, 79
ถนนพระราม 6', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (15, 'ห้องแถวไม้ เลขที่ 53
ถนนพระราม 6', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (16, 'ตึกแถว เลขที่ 39 ถนนพระราม 6', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (17, 'ตึกแถว เลขที่ 216, 218
ซอยราชดำเนิน 6', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (18, 'ห้องแถวไม้ เลขที่ 121 ถนนราชดำเนิน ร้านตรังสโสโลว์', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (19, 'ตึกแถว เลขที่ 88 ถนนราชดำเนิน', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (20, 'ตึกแถว เลขที่ 154
ซอยราชดำเนิน 4', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (21, 'ตึกแถวเลขที่ 188, 190
ซอยราชดำเนิน 6', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (22, 'ตึกแถว เลขที่ 33 ถนนพระราม 6', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (23, 'อาคารตึกแถว 3 ขั้น ซอยราชดำเนิน 6', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (24, 'ตึกแถว เลขที่ 25 ถนนพระราม 6', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (25, 'ห้องแถวไม้ เลขที่ 114 ถนนพระราม 6', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (26, 'อาคาร เลขที่ 134 ถนนพระราม 6', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (27, 'ห้องแถวไม้ เลขที่ 110 ชอยกันดัง 3', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (28, 'ตึกแถว เลขที่ 101 ชอยกันตัง 3', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (29, 'เลขที่ 51, 53, 55 ถนนกันตัง', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (30, 'กลุ่มตึกแถว ลขที่ 15, 17, 19, 21,23,25,27,29,31,31,33,35,37,39,41 ถนนกันกันตั้ง', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (31, 'ตึกแถว เลขที่ 42, 44 ถนนนราชดำเนิน', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (32, 'ตึกแถว เลขที่ 29, 31, 33 ถนนราชดำเนิน', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (33, 'ตึกแถว เลขที่ 17, 19 ถนนราชดำเนิน', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (34, 'บ้านไทรงาม ถนนราชดำเนิน', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (35, 'ตึกแถว เลขที่ 3, 5 ชอยห้วยยอด 2 ร้าน ทิพย์วิมล ดีไซน์ แอนด์ เดคอร์', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (36, 'อาคารไม้เลขที่ 1 ถนนราชดำเนิน', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (37, 'ตึกแถว เลขที่ 10, 12
ถนนห้วยยอด', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (38, 'ห้องแถวไม้ เลขที่ 16 ถนนท่ากลาง', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (39, 'ตรัง เอฟบีที', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (40, 'เลขที่ 152/5, 152/4 ชอยสถานี', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (41, 'เลขที่ 79/1 ถนนสถานี', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (42, 'ตึกแถว เลขที่ 43, 45, 47, 49, 51 ถนนทากลาง', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (43, 'อาคารโรงพยาบาลตรังชาตะสงเคราะห์ ถนนห้วยยอด', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (44, 'วิหารคริสตจักรตรัง', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (45, 'ห้องแถวไม้เลขที่ 4 ถึง 28
(ข้างโรงเรียนวัฒนาศึกษา) ถนนวิเศษกุล', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (46, 'ห้องแถวไม้เลขที่ 4 ถึง 28
(ข้างโรงเรียนวัฒนาศึกษา) ถนนวิเศษกุล', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (47, 'ห้องแถวไม้ เลขที่ 10/9 ชอยวิเศษกุล 2', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (48, 'ตึกแถว เลขที่ 33, 35, 37, 39,
41, 43 ถนนวิเศษกุล', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (49, 'ศาลเจ้ากิวอ่องเอี่ย (โรงพระกินผัก)', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (50, 'อุโบสถวัดมัชฌิมภูมิ', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (51, 'สถานีรถไฟตรัง', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (52, 'โรงแรมศรีตรัง ถนนพระราม 6', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (53, 'ไปรษณีย์ไทย สาขาทับเที่ยง', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (54, 'ธนาคารกรุงเทพ เลขที่ 2
ถนนพระราม 6', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (55, 'ตึกแถวเลขที่ 152, 154 ถนนกันตัง', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (56, 'ตึกแถว เลขที่ 158, 160 ถนนกันตั้ง ร้านเอเซียโอซา', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (57, 'ตึกแถว เลขที่ 158, 160, 162, 164, 166, 168 ถนนราชดำเนิน', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (58, 'ตึกแถว เลขที่ 182, 184, 186
ถนนราชดำเนิน', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (59, 'ห้องแถวไม้ เลขที่ 275, 277, 279, 281, 283, 285 ถนนราชดำเนิน', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (60, 'ตึกแถว เลขที่ 257, 259 หัวมุมซอยราชดำเนิน 1', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (61, 'ห้องแถวไม้ เลขที่ 43, 45, 47, 49, 51 ซอยไทรงาม 2', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (62, 'ห้องแถวไม้ เลขที่ 92, 94 ชอยไทรงาม 2', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (63, 'ห้องแถวไม้ เลขที่ 80, 82, 84 ซอยไทรงาม 2', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (64, 'ตึกแถวเลขที่ 233, 235, 237, 239 ถนนราชดำเนิน', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (65, 'ตึกแถว เลขที่ 132, 134, 136 ชอยราชดำเนิน 1', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (66, 'องค์การบริหารส่วนจังหวัดตรัง', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (67, 'ตึกแถว เลขที่ 15/1 ถนนรื่นรมย์', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (68, 'สโมสรข้าราชการจังหวัดตรัง ถนนพระระราม 6', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (69, 'จวนผู้ว่าราชการจังหวัดตรัง ถนนอุดมลาภ', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (70, 'ตึกแถวปากซอยอุดมลาภ 3', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (71, 'ตึกแถว เลขที่ 153, 155
ถนนพัทลุง (ถนนเพชรเกษม)', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');
INSERT INTO "public"."BuildPlan" VALUES (72, 'เลขที่ 191,193 ถนนห้วยยอด', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00');

-- ----------------------------
-- Table structure for BuildingControl
-- ----------------------------
DROP TABLE IF EXISTS "public"."BuildingControl";
CREATE TABLE "public"."BuildingControl" (
  "id" int4 NOT NULL DEFAULT nextval('"BuildingControl_id_seq"'::regclass),
  "building_type" text COLLATE "pg_catalog"."default",
  "use_purpose" text COLLATE "pg_catalog"."default",
  "quantity" int4,
  "fiscalYearId" int4,
  "owner_id" int4,
  "status" text COLLATE "pg_catalog"."default",
  "license_number" text COLLATE "pg_catalog"."default",
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL,
  "date" timestamp(3)
)
;

-- ----------------------------
-- Records of BuildingControl
-- ----------------------------
INSERT INTO "public"."BuildingControl" VALUES (26, 'test2', NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-30 07:27:44.47', '2026-03-30 10:38:23.027', NULL);
INSERT INTO "public"."BuildingControl" VALUES (25, 'สถานนีน้ำมัน', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, 'เสร็จสิ้น', NULL, '2026-03-30 07:27:36.571', '2026-03-30 07:27:36.571', '2026-03-30 20:39:48');
INSERT INTO "public"."BuildingControl" VALUES (27, 'สนามแบดมินตัน มาตีโต้', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (28, 'โรงเรียนดรุโนทัย', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (29, 'สถานีบริการน้ำมันเชื้อเพลิง ซัสโก้', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (30, 'สถานีบริการน้ำมันเชื้อเพลิง บางจาก', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (31, 'The Room Hotel & Service Apartment', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (32, 'บริษัท ศรีตรังแอโกร อินดัสทรี จำกัด (มหาชน)', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (33, 'บิ๊กซี ซุปเปอร์เซ็นเตอร์', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (34, 'ห้างหุ้นส่วนจำกัด ตรังวิรุณกิจขนส่ง', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (35, 'โรงแรม บีบี ตรัง', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (36, 'โรงแรม เฌอแตม', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (37, 'โรงแรม ดีดี เรสซิเด้นท์', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (38, 'สถานีบริการน้ำมันเชื้อเพลิง บางจาก2', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (39, 'สถานีบริการน้ำมันเชื้อเพลิง susco', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (40, 'Namthip Residence Hotel', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (41, 'สถานีบริการน้ำมันเชื้อเพลิง ป.ต.ท', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (42, '86', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (43, 'T&B Apartment', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (44, 'โรงแรมไรวินทร์ เพลส', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (45, 'ที่รัก', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (46, 'My Friends Hotel', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (47, 'warm up bar', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (48, 'โรงแรมอยู่สบาย', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (49, 'ร้าน แฮงค์เอ้าท์', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (50, 'วาโนะเจแปน', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (51, 'Srisomboon Hostel', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (52, 'Ban Ao Thong', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (53, 'ตรังคอนโดมิเนียม', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (54, 'โรงแรมชมตรัง', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (55, 'โรงแรมเมซอง เดอ เชียร์', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (56, 'ไมตรี เฮ้าร์', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (57, 'โรงแรมธรรมรินทร์', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (58, 'โรงแรม ฮอลิเดย์', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (59, 'โรงแรม เมซอง เดอ เชียร์', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (60, 'เดอะ กลาสเฮาส์ เพลส', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (61, 'โรงแรมมิตรทาวน์', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (62, 'บ้านควนหนุน เรสซิเด้นท์', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (63, 'โรงแรม สเตชั่น', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (64, 'โรงแรมทีเบิร์ด แกรนด์', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (65, 'โรงแรม โกเต็ง', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (66, 'โรงแรม วัฒนา', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (67, 'ตลาดชินตา', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (68, 'บลูออคิด รีสอร์ท', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (69, 'โรงพยาบาล ราชดำเนิน', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (70, 'คุ้มโจโฉ', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (71, 'โรงแรม S2S ควีนส์ ตรัง', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (72, 'ทักษิณ อพาร์ตเมนท์', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (73, 'มูลนิธิแห่งสภาคริสตจักรในประเทศไทย', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (74, 'โรงเรียนตรังคริสเตียนศึกษา', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (75, 'สถานีบริการน้ำมันเชื้อเพลิง ท่ากลางปิโตรเลียม esso', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (76, 'สถานีบริการน้ำมันเชื้อเพลิง บางจาก-เมืองตรัง', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (77, 'โรงแรมธรรมรินทร์ ธนา', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (78, 'ห้างสิริบรรณ', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (79, 'ปาล์มคอร์ด อภาทเม้นต์', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (80, 'โรงแรมบ้านบุษบา', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (81, 'ลีมาร์ทเอ็กซ์เพรส', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (82, 'Garden Hill Hotel', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (83, 'โรงแรมเซ็นเตอร์พ้อยท์', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (84, 'วงแข เมนชั่น', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (85, 'สถานีบริการน้ำมันเชื้อเพลิง คาลเท็กซ์ สาขาตรัง', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (86, 'โรบินสัน ตรัง', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (87, 'โรงพยาบาลวัฒนแพทย์ ตรัง', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (88, 'โรงแรมอีโค่อินน์', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (89, 'คาลเท็กซ์ สาขาตรังคสุวรรณ (สาขา 1)', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (90, 'สถานีบริการน้ำมันเชื้อเพลิง เชลล์ ทับเที่ยง', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (91, 'โรงแรมเรือรัษฎา', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (92, 'มหานคร@ตรัง', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (93, 'ดูสบาย 2020', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (94, 'นันนทีโมเต็ล', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (95, 'โรงแรมช้างเรสซิเดนซ์ ตรัง', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (96, 'โรงแรมรักษ์จันทร์', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (97, 'โรงพยาบาลตรังรวมแพทย์ (โรงพยาบาล TRPH)', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (98, 'โรงแรม ซี ซ่า', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (99, 'โรงแรมจรูญศักดิ์ แกรนด์ - Jaroonsak Grand Hotel', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (100, 'โรงแรมมิราเคิล อินน์ ตรัง', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (101, 'โรงแรมชมพูนครินทร์', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (102, 'โรงแรมวัฒนาพาร์ค', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (103, 'ปั๊มน้ำมันพีที ตรัง2 (แยกวัดกุฏ)', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (104, 'อินญาวัฒน์แมนชั่น', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (105, 'โรงแรม ณ ทับเที่ยง บูติค รีสอร์ท', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (106, 'โรงแรมมายเฮ้าส์ การ์เดนท์ รีสอร์ท', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (107, 'โรงแรม ปาล์มมี่ รีสอร์ท', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (108, 'โรงแรมรื่นรมย์ รีสอร์ท', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (109, 'ห้างหุ้นส่วนจำกัด ปิชยดาปิโตรเลียม', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."BuildingControl" VALUES (110, 'โรงเรียนปัญญาวิทย์ (แผนกมัธยม)', 'ใช้ในการประกอบอนุญาตอาคาร', NULL, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);

-- ----------------------------
-- Table structure for FiscalYear
-- ----------------------------
DROP TABLE IF EXISTS "public"."FiscalYear";
CREATE TABLE "public"."FiscalYear" (
  "id" int4 NOT NULL DEFAULT nextval('"FiscalYear_id_seq"'::regclass),
  "year" int4 NOT NULL,
  "detail" text COLLATE "pg_catalog"."default",
  "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Records of FiscalYear
-- ----------------------------

-- ----------------------------
-- Table structure for Map
-- ----------------------------
DROP TABLE IF EXISTS "public"."Map";
CREATE TABLE "public"."Map" (
  "id" int4 NOT NULL DEFAULT nextval('"Map_id_seq"'::regclass),
  "buildingControlId" int4,
  "riskZoneId" int4,
  "zoningPlanId" int4,
  "planProjectId" int4,
  "approvedProjectId" int4,
  "name_local" text COLLATE "pg_catalog"."default",
  "house_no" text COLLATE "pg_catalog"."default",
  "address" text COLLATE "pg_catalog"."default",
  "latitude" float8,
  "longitude" float8,
  "colors" text COLLATE "pg_catalog"."default",
  "geoJsonData" jsonb,
  "image_before" text COLLATE "pg_catalog"."default",
  "image_after" text COLLATE "pg_catalog"."default",
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL,
  "palnbuildId" int4
)
;

-- ----------------------------
-- Records of Map
-- ----------------------------
INSERT INTO "public"."Map" VALUES (868, NULL, NULL, NULL, 12, NULL, 'ถนนราชดำเนิน', 'ตง.ถ.2-0001', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6044315, 7.5578337, 0.0], [99.6051042, 7.5575501, 0.0], [99.6054008, 7.5574196, 0.0], [99.6056963, 7.5572896, 0.0], [99.6062142, 7.5570507, 0.0], [99.6065999, 7.556842, 0.0], [99.6071049, 7.5565924, 0.0], [99.6072543, 7.5565589, 0.0], [99.6074264, 7.556593, 0.0], [99.6075705, 7.5566529, 0.0], [99.6077449, 7.556775, 0.0], [99.6084533, 7.5574521, 0.0], [99.6087462, 7.5577456, 0.0], [99.6090605, 7.5580435, 0.0]]}', NULL, NULL, '2026-03-30 21:05:55.515', '2026-03-30 21:13:58.371', NULL);
INSERT INTO "public"."Map" VALUES (872, NULL, NULL, NULL, 13, NULL, 'ถนนพระราม 6', 'ตง.ถ.2-0002', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6058195, 7.555054, 0.0], [99.6066607, 7.5553997, 0.0], [99.6069749, 7.5555288, 0.0], [99.6073213, 7.5556721, 0.0], [99.6076677, 7.5558196, 0.0], [99.6081261, 7.556025, 0.0], [99.6100325, 7.5569086, 0.0], [99.6104177, 7.5570668, 0.0], [99.6110976, 7.5573792, 0.0], [99.6118034, 7.55767, 0.0], [99.6122536, 7.5578351, 0.0], [99.6125397, 7.5579463, 0.0], [99.6129806, 7.5580128, 0.0], [99.6133699, 7.5580589, 0.0], [99.6137784, 7.5580175, 0.0], [99.6140374, 7.5579228, 0.0], [99.6143382, 7.5577367, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.413', '2026-03-30 21:15:11.413', NULL);
INSERT INTO "public"."Map" VALUES (873, NULL, NULL, NULL, 14, NULL, 'ถนนวิเศษกุล', 'ตง.ถ.2-0003', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6109632, 7.5427749, 0.0], [99.6106203, 7.5451336, 0.0], [99.6104883, 7.5460909, 0.0], [99.6103704, 7.5471092, 0.0], [99.6103502, 7.5472841, 0.0], [99.6101058, 7.5509238, 0.0], [99.6100826, 7.5519729, 0.0], [99.6100411, 7.5538422, 0.0], [99.6100327, 7.5555245, 0.0], [99.609942, 7.5567606, 0.0], [99.6091178, 7.5578604, 0.0], [99.6077267, 7.5595104, 0.0], [99.6067005, 7.5607564, 0.0], [99.606065, 7.5615126, 0.0], [99.605478, 7.5621818, 0.0], [99.605354, 7.5622937, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.414', '2026-03-30 21:15:11.414', NULL);
INSERT INTO "public"."Map" VALUES (874, NULL, NULL, NULL, 15, NULL, 'ถนนกันตัง', 'ตง.ถ.2-0004', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.5876638, 7.5411664, 0.0], [99.5876958, 7.5412124, 0.0], [99.588244, 7.5419359, 0.0], [99.589222, 7.5432521, 0.0], [99.5898418, 7.5436268, 0.0], [99.5900655, 7.5437016, 0.0], [99.5901795, 7.5436607, 0.0], [99.5902659, 7.5435656, 0.0], [99.5908154, 7.5428439, 0.0], [99.5911508, 7.5424019, 0.0], [99.5913783, 7.5421312, 0.0], [99.5915191, 7.5420763, 0.0], [99.5916621, 7.5420536, 0.0], [99.5920377, 7.5420319, 0.0], [99.5921179, 7.5420272, 0.0], [99.5932186, 7.5418326, 0.0], [99.5932232, 7.5418312, 0.0], [99.5937382, 7.5416726, 0.0], [99.5940827, 7.5415868, 0.0], [99.5943986, 7.5415596, 0.0], [99.5944869, 7.541552, 0.0], [99.5951972, 7.5415944, 0.0], [99.5953207, 7.5416018, 0.0], [99.5962544, 7.5415453, 0.0], [99.5970627, 7.5413907, 0.0], [99.597698, 7.5412504, 0.0], [99.5982751, 7.5411936, 0.0], [99.5984505, 7.5411764, 0.0], [99.5992824, 7.5410143, 0.0], [99.6001573, 7.5407857, 0.0], [99.6005785, 7.5406349, 0.0], [99.6009976, 7.5404669, 0.0], [99.6010608, 7.5404358, 0.0], [99.6011348, 7.5403994, 0.0], [99.6017669, 7.5400882, 0.0], [99.6019536, 7.5400155, 0.0], [99.6020656, 7.5399719, 0.0], [99.6024203, 7.5398792, 0.0], [99.6026584, 7.5398387, 0.0], [99.6029427, 7.5397905, 0.0], [99.6034663, 7.5397822, 0.0], [99.6035706, 7.5398347, 0.0], [99.603647, 7.5398936, 0.0], [99.6036923, 7.5399986, 0.0], [99.6037055, 7.5401649, 0.0], [99.6037466, 7.5411316, 0.0], [99.6038599, 7.5422161, 0.0], [99.6039549, 7.5424853, 0.0], [99.6040267, 7.5426885, 0.0], [99.6042687, 7.5435465, 0.0], [99.6052444, 7.5466689, 0.0], [99.6053421, 7.5472922, 0.0], [99.6053299, 7.5478286, 0.0], [99.6053136, 7.5487799, 0.0], [99.60531, 7.5489874, 0.0], [99.6053195, 7.5496226, 0.0], [99.6055012, 7.5503476, 0.0], [99.6055422, 7.5504835, 0.0], [99.6057232, 7.5510818, 0.0], [99.6058014, 7.5513407, 0.0], [99.6058417, 7.5516759, 0.0], [99.6058972, 7.5521374, 0.0], [99.6059015, 7.5521731, 0.0], [99.6059336, 7.5524735, 0.0], [99.6060651, 7.5537056, 0.0], [99.6060802, 7.5538466, 0.0], [99.6061107, 7.5541599, 0.0], [99.6061035, 7.5542346, 0.0], [99.6060853, 7.5544217, 0.0], [99.6058195, 7.555054, 0.0], [99.6053385, 7.5559225, 0.0], [99.6052877, 7.5560143, 0.0], [99.6051811, 7.5562389, 0.0], [99.6050104, 7.5565983, 0.0], [99.6047621, 7.5571281, 0.0], [99.6044315, 7.5578337, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.415', '2026-03-30 21:15:11.415', NULL);
INSERT INTO "public"."Map" VALUES (927, NULL, NULL, NULL, 71, NULL, 'ถนนห้วยยอด ซอย 6', 'ตง.ถ.2-0063', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6036021, 7.5626136, 0.0], [99.6051349, 7.5626354, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.454', '2026-03-30 21:15:11.454', NULL);
INSERT INTO "public"."Map" VALUES (875, NULL, NULL, NULL, 16, NULL, 'ถนนห้วยยอด', 'ตง.ถ.2-0005', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6044315, 7.5578337, 0.0], [99.6044277, 7.5586074, 0.0], [99.6044271, 7.5587178, 0.0], [99.6044276, 7.5590246, 0.0], [99.6044904, 7.5593378, 0.0], [99.6046933, 7.559889, 0.0], [99.604866, 7.5604295, 0.0], [99.6049552, 7.5606998, 0.0], [99.6050712, 7.5610515, 0.0], [99.6051728, 7.561457, 0.0], [99.6052208, 7.561959, 0.0], [99.6051349, 7.5626354, 0.0], [99.6049698, 7.5639357, 0.0], [99.6049503, 7.5651237, 0.0], [99.6049394, 7.5655277, 0.0], [99.6049338, 7.5658219, 0.0], [99.604978, 7.5667381, 0.0], [99.6051686, 7.5677462, 0.0], [99.6052315, 7.5680789, 0.0], [99.6052066, 7.5687441, 0.0], [99.6051533, 7.5692547, 0.0], [99.6050998, 7.5697678, 0.0], [99.6050538, 7.5702078, 0.0], [99.6050977, 7.5708429, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.417', '2026-03-30 21:15:11.417', NULL);
INSERT INTO "public"."Map" VALUES (876, NULL, NULL, NULL, 17, NULL, 'ถนนพัทลุง(ตอนที่ 1)', 'ตง.ถ.2-0006', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6090605, 7.5580435, 0.0], [99.6093544, 7.5583388, 0.0], [99.6093617, 7.5583461, 0.0], [99.6096381, 7.5585873, 0.0], [99.6096761, 7.5586204, 0.0], [99.6101288, 7.5589738, 0.0], [99.6102057, 7.5590338, 0.0], [99.6106577, 7.5593647, 0.0], [99.6110243, 7.5595548, 0.0], [99.6114967, 7.5597997, 0.0], [99.6115594, 7.5598323, 0.0], [99.6117152, 7.5599084, 0.0], [99.612702, 7.5603907, 0.0], [99.613794, 7.5608709, 0.0], [99.6141125, 7.5610293, 0.0], [99.6143364, 7.5611791, 0.0], [99.6148866, 7.5616278, 0.0], [99.6151351, 7.5618304, 0.0], [99.6154838, 7.5620723, 0.0], [99.6160302, 7.5622218, 0.0], [99.616439, 7.5623972, 0.0], [99.616564, 7.5625019, 0.0], [99.6166801, 7.5625991, 0.0], [99.6171753, 7.5630141, 0.0], [99.6172133, 7.5630439, 0.0], [99.6173565, 7.563156, 0.0], [99.6177221, 7.5634425, 0.0], [99.6180149, 7.563618, 0.0], [99.6181803, 7.5636771, 0.0], [99.6183429, 7.5637088, 0.0], [99.6189526, 7.5637326, 0.0], [99.619206, 7.5637099, 0.0], [99.6198298, 7.5636541, 0.0], [99.6202471, 7.5637222, 0.0], [99.6209873, 7.5640473, 0.0], [99.621551, 7.5642224, 0.0], [99.6218652, 7.5643808, 0.0], [99.6219213, 7.5645051, 0.0], [99.6217652, 7.565147, 0.0], [99.6217827, 7.5653551, 0.0], [99.6218603, 7.5654708, 0.0], [99.6222045, 7.5655862, 0.0], [99.6230177, 7.5657932, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.419', '2026-03-30 21:15:11.419', NULL);
INSERT INTO "public"."Map" VALUES (877, NULL, NULL, NULL, 18, NULL, 'ถนนพัทลุง(ตอนที่ 2)', 'ตง.ถ.2-0007', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.621551, 7.5642224, 0.0], [99.6221972, 7.5638465, 0.0], [99.6225262, 7.563831, 0.0], [99.6228403, 7.563925, 0.0], [99.6240152, 7.5645048, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.42', '2026-03-30 21:15:11.42', NULL);
INSERT INTO "public"."Map" VALUES (878, NULL, NULL, NULL, 19, NULL, 'ถนนรัษฎา', 'ตง.ถ.2-0008', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6158483, 7.5426358, 0.0], [99.6159492, 7.544039, 0.0], [99.6159501, 7.5446399, 0.0], [99.615822, 7.5452967, 0.0], [99.6156984, 7.5460522, 0.0], [99.6155572, 7.5465931, 0.0], [99.6153386, 7.547117, 0.0], [99.6148496, 7.548006, 0.0], [99.6145325, 7.5488434, 0.0], [99.6142629, 7.5497965, 0.0], [99.6140579, 7.5508182, 0.0], [99.6139601, 7.5515951, 0.0], [99.6139215, 7.5518807, 0.0], [99.613909, 7.5519728, 0.0], [99.6139011, 7.5524492, 0.0], [99.6139178, 7.5529682, 0.0], [99.6139607, 7.5542978, 0.0], [99.6140108, 7.5554833, 0.0], [99.6140948, 7.55605, 0.0], [99.6141085, 7.5561419, 0.0], [99.6141664, 7.5564213, 0.0], [99.6142674, 7.5569083, 0.0], [99.6142882, 7.5570085, 0.0], [99.6143435, 7.557476, 0.0], [99.6143382, 7.5577367, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.42', '2026-03-30 21:15:11.42', NULL);
INSERT INTO "public"."Map" VALUES (879, NULL, NULL, NULL, 20, NULL, 'ถนนเจิมปัญญา', 'ตง.ถ.2-0009', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6143382, 7.5577367, 0.0], [99.6150719, 7.5581345, 0.0], [99.6152258, 7.558221, 0.0], [99.6161717, 7.5587531, 0.0], [99.6163139, 7.5589643, 0.0], [99.6163961, 7.559285, 0.0], [99.6163814, 7.5595843, 0.0], [99.6163625, 7.5598461, 0.0], [99.6160302, 7.5622218, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.421', '2026-03-30 21:15:11.421', NULL);
INSERT INTO "public"."Map" VALUES (880, NULL, NULL, NULL, 21, NULL, 'ถนนบางรัก', 'ตง.ถ.2-0010', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.5900655, 7.5437016, 0.0], [99.5902114, 7.5438724, 0.0], [99.5909524, 7.5448169, 0.0], [99.5915241, 7.5456445, 0.0], [99.591881, 7.5466568, 0.0], [99.5925372, 7.5484813, 0.0], [99.592743, 7.5491076, 0.0], [99.5930677, 7.5496007, 0.0], [99.5937706, 7.5504867, 0.0], [99.5950058, 7.5523959, 0.0], [99.5955423, 7.5533303, 0.0], [99.5957214, 7.5536423, 0.0], [99.5960538, 7.5543107, 0.0], [99.5959812, 7.5559759, 0.0], [99.5959501, 7.5566901, 0.0], [99.5959492, 7.5567106, 0.0], [99.5958744, 7.5575418, 0.0], [99.5958719, 7.5575607, 0.0], [99.5957216, 7.5587179, 0.0], [99.5956428, 7.5593249, 0.0], [99.595623, 7.5595103, 0.0], [99.5955964, 7.5597581, 0.0], [99.59554, 7.5604034, 0.0], [99.5955147, 7.5607968, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.422', '2026-03-30 21:15:11.422', NULL);
INSERT INTO "public"."Map" VALUES (881, NULL, NULL, NULL, 22, NULL, 'ถนนจริงจิตร', 'ตง.ถ.2-0011', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.5909524, 7.5448169, 0.0], [99.5916111, 7.5447357, 0.0], [99.5921832, 7.5446652, 0.0], [99.5934507, 7.5445089, 0.0], [99.5936997, 7.5444385, 0.0], [99.5945799, 7.5441897, 0.0], [99.5947289, 7.5441398, 0.0], [99.5954969, 7.5438824, 0.0], [99.595537, 7.5438716, 0.0], [99.5961905, 7.5436954, 0.0], [99.597406, 7.543545, 0.0], [99.5986508, 7.5434536, 0.0], [99.599192, 7.5434138, 0.0], [99.5999173, 7.5433699, 0.0], [99.6006052, 7.5432545, 0.0], [99.6022303, 7.5428398, 0.0], [99.6026115, 7.5427425, 0.0], [99.6028322, 7.5426943, 0.0], [99.602974, 7.5426633, 0.0], [99.6032562, 7.5426171, 0.0], [99.6033352, 7.5426042, 0.0], [99.6033801, 7.5425955, 0.0], [99.6039549, 7.5424853, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.423', '2026-03-30 21:15:11.423', NULL);
INSERT INTO "public"."Map" VALUES (924, NULL, NULL, NULL, 68, NULL, 'ถนนห้วยยอด ซอย 3', 'ตง.ถ.2-0060', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.5920377, 7.5420319, 0.0], [99.5920377, 7.5420319, 0.0], [99.5920503, 7.5421383, 0.0], [99.5920809, 7.542503, 0.0], [99.5921, 7.5428692, 0.0], [99.5921678, 7.5442482, 0.0], [99.5921832, 7.5446652, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.452', '2026-03-30 21:15:11.452', NULL);
INSERT INTO "public"."Map" VALUES (882, NULL, NULL, NULL, 23, NULL, 'ถนนรักษ์จันทร์(ตอนที่ 1)', 'ตง.ถ.2-0012', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6148682, 7.5678616, 0.0], [99.6152127, 7.5691294, 0.0], [99.6152834, 7.5695055, 0.0], [99.615223, 7.5703267, 0.0], [99.6151923, 7.5709204, 0.0], [99.6151344, 7.5725456, 0.0], [99.6151291, 7.5729147, 0.0], [99.6151467, 7.5731493, 0.0], [99.6152129, 7.5733552, 0.0], [99.6152763, 7.5735468, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.424', '2026-03-30 21:15:11.424', NULL);
INSERT INTO "public"."Map" VALUES (883, NULL, NULL, NULL, 24, NULL, 'ถนนรักษ์จันทร์(ตอนที่ 2)', 'ตง.ถ.2-0013', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6167008, 7.5733808, 0.0], [99.6169327, 7.5739292, 0.0], [99.6170108, 7.5741657, 0.0], [99.6172955, 7.5750274, 0.0], [99.6174797, 7.575492, 0.0], [99.6178461, 7.576257, 0.0], [99.6178837, 7.5763355, 0.0], [99.618489, 7.5775334, 0.0], [99.6186647, 7.5779166, 0.0], [99.6191563, 7.5789888, 0.0], [99.6193216, 7.5792023, 0.0], [99.6193732, 7.5792688, 0.0], [99.6201594, 7.5796654, 0.0], [99.6207703, 7.5798305, 0.0], [99.6222751, 7.580125, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.426', '2026-03-30 21:15:11.426', NULL);
INSERT INTO "public"."Map" VALUES (884, NULL, NULL, NULL, 25, NULL, 'ถนนอุดมลาภ', 'ตง.ถ.2-0014', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6117152, 7.5599084, 0.0], [99.6119306, 7.5605556, 0.0], [99.6120378, 7.5607921, 0.0], [99.6121542, 7.5610488, 0.0], [99.6123141, 7.5613402, 0.0], [99.6123425, 7.5613919, 0.0], [99.6124829, 7.5615768, 0.0], [99.6125292, 7.5616377, 0.0], [99.6126784, 7.5617304, 0.0], [99.6127198, 7.5617412, 0.0], [99.6128476, 7.5617745, 0.0], [99.6132965, 7.5618683, 0.0], [99.6133276, 7.5618736, 0.0], [99.6141024, 7.5620045, 0.0], [99.6142191, 7.5620208, 0.0], [99.6145899, 7.5620725, 0.0], [99.6151806, 7.5621175, 0.0], [99.6154838, 7.5620723, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.427', '2026-03-30 21:15:11.427', NULL);
INSERT INTO "public"."Map" VALUES (885, NULL, NULL, NULL, 26, NULL, 'ถนนควนคีรี', 'ตง.ถ.2-0015', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6142191, 7.5620208, 0.0], [99.6140302, 7.5629495, 0.0], [99.6138926, 7.5634904, 0.0], [99.6137928, 7.563864, 0.0], [99.6137865, 7.5640707, 0.0], [99.6137805, 7.5642659, 0.0], [99.6138065, 7.5645006, 0.0], [99.6138197, 7.5646192, 0.0], [99.6141518, 7.5657911, 0.0], [99.6141586, 7.5658143, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.427', '2026-03-30 21:15:11.427', NULL);
INSERT INTO "public"."Map" VALUES (886, NULL, NULL, NULL, 27, NULL, 'ถนนเพลินพิทักษ์', 'ตง.ถ.2-0016', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6050977, 7.5708429, 0.0], [99.6054195, 7.570783, 0.0], [99.6062164, 7.5706388, 0.0], [99.6070895, 7.5704894, 0.0], [99.6071767, 7.5704744, 0.0], [99.6086359, 7.5703036, 0.0], [99.6088853, 7.570266, 0.0], [99.6090745, 7.5702257, 0.0], [99.6094355, 7.5700679, 0.0], [99.6102923, 7.5696833, 0.0], [99.611043, 7.5693618, 0.0], [99.6112437, 7.56931, 0.0], [99.6114042, 7.5693098, 0.0], [99.612276, 7.5694173, 0.0], [99.612471, 7.5694342, 0.0], [99.6126029, 7.569414, 0.0], [99.6127404, 7.5693537, 0.0], [99.6128664, 7.5692276, 0.0], [99.6129376, 7.56914, 0.0], [99.6131784, 7.5688438, 0.0], [99.6133902, 7.5685789, 0.0], [99.6135104, 7.5684413, 0.0], [99.6136135, 7.5683668, 0.0], [99.6136915, 7.5683304, 0.0], [99.6137425, 7.5683066, 0.0], [99.6141066, 7.5681555, 0.0], [99.6141924, 7.5681199, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.428', '2026-03-30 21:15:11.428', NULL);
INSERT INTO "public"."Map" VALUES (887, NULL, NULL, NULL, 28, NULL, 'ถนนเวียนกะพัง(ตอนที่1)', 'ตง.ถ.2-0017', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6225027, 7.5684336, 0.0], [99.6228116, 7.5690058, 0.0], [99.6232926, 7.5698966, 0.0], [99.6236445, 7.5703169, 0.0], [99.6238369, 7.5705467, 0.0], [99.6241314, 7.5709512, 0.0], [99.6242985, 7.5715403, 0.0], [99.624335, 7.5720037, 0.0], [99.6243396, 7.5726918, 0.0], [99.6243601, 7.5730344, 0.0], [99.6243704, 7.5732075, 0.0], [99.6246092, 7.5732651, 0.0], [99.6247362, 7.5733321, 0.0], [99.6247714, 7.5733743, 0.0], [99.6247516, 7.5735732, 0.0], [99.6243975, 7.5735751, 0.0], [99.6242381, 7.5733736, 0.0], [99.6240147, 7.5735771, 0.0], [99.6237197, 7.5738064, 0.0], [99.6235612, 7.5742165, 0.0], [99.6234699, 7.5745242, 0.0], [99.6232378, 7.5756546, 0.0], [99.6232508, 7.5767304, 0.0], [99.6232527, 7.5780064, 0.0], [99.6232003, 7.5784936, 0.0], [99.6230444, 7.5787248, 0.0], [99.622764, 7.5791315, 0.0], [99.6222751, 7.580125, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.428', '2026-03-30 21:15:11.428', NULL);
INSERT INTO "public"."Map" VALUES (888, NULL, NULL, NULL, 29, NULL, 'ถนนเวียนกะพัง(ตอนที่2)', 'ตง.ถ.2-0018', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6232003, 7.5784936, 0.0], [99.624307, 7.5784605, 0.0], [99.6245393, 7.5784716, 0.0], [99.6247343, 7.5785171, 0.0], [99.6249867, 7.5785396, 0.0], [99.6254139, 7.5785476, 0.0], [99.6260676, 7.5765296, 0.0], [99.6261762, 7.5762777, 0.0], [99.6264194, 7.575894, 0.0], [99.6265164, 7.5755333, 0.0], [99.6264957, 7.5751271, 0.0], [99.6264535, 7.5749348, 0.0], [99.6264178, 7.5747724, 0.0], [99.6263876, 7.5747177, 0.0], [99.62632, 7.5745952, 0.0], [99.6262583, 7.5745495, 0.0], [99.6261364, 7.5745039, 0.0], [99.6249206, 7.5744455, 0.0], [99.6248145, 7.5744199, 0.0], [99.6247283, 7.5743543, 0.0], [99.6247067, 7.5742756, 0.0], [99.6247051, 7.5741426, 0.0], [99.6247516, 7.5735732, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.429', '2026-03-30 21:15:11.429', NULL);
INSERT INTO "public"."Map" VALUES (889, NULL, NULL, NULL, 30, NULL, 'ถนนสังขวิทย์', 'ตง.ถ.2-0019', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6050924, 7.5655797, 0.0], [99.6057294, 7.5657964, 0.0], [99.6062917, 7.5660217, 0.0], [99.6068282, 7.566277, 0.0], [99.6079508, 7.5667729, 0.0], [99.6084004, 7.5669715, 0.0], [99.6090402, 7.5672567, 0.0], [99.6092611, 7.5673293, 0.0], [99.6094919, 7.5673791, 0.0], [99.6098963, 7.5674257, 0.0], [99.6103034, 7.5674023, 0.0], [99.6107247, 7.5672615, 0.0], [99.6119225, 7.5667648, 0.0], [99.6124927, 7.5665209, 0.0], [99.6130172, 7.5663485, 0.0], [99.6133096, 7.5663623, 0.0], [99.6134559, 7.5664079, 0.0], [99.6135879, 7.5664907, 0.0], [99.6136311, 7.5666194, 0.0], [99.6136648, 7.5681472, 0.0], [99.6136915, 7.5683304, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.429', '2026-03-30 21:15:11.429', NULL);
INSERT INTO "public"."Map" VALUES (890, NULL, NULL, NULL, 31, NULL, 'ถนนท่ากลาง', 'ตง.ถ.2-0020', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.5955147, 7.5607968, 0.0], [99.5970912, 7.5612331, 0.0], [99.5974269, 7.561326, 0.0], [99.5976793, 7.56134, 0.0], [99.5979315, 7.5613024, 0.0], [99.5992758, 7.5609744, 0.0], [99.6002704, 7.5607728, 0.0], [99.6003427, 7.5607456, 0.0], [99.6006372, 7.5606349, 0.0], [99.6009581, 7.5604628, 0.0], [99.6015767, 7.5599498, 0.0], [99.6022525, 7.5593223, 0.0], [99.602834, 7.5589067, 0.0], [99.6032608, 7.5586572, 0.0], [99.603696, 7.5583511, 0.0], [99.6044315, 7.5578337, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.43', '2026-03-30 21:15:11.43', NULL);
INSERT INTO "public"."Map" VALUES (891, NULL, NULL, NULL, 32, NULL, 'ถนนรื่นรมย์', 'ตง.ถ.2-0021', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6114967, 7.5597997, 0.0], [99.6125397, 7.5579463, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.431', '2026-03-30 21:15:11.431', NULL);
INSERT INTO "public"."Map" VALUES (892, NULL, NULL, NULL, 33, NULL, 'ถนนวังตอ', 'ตง.ถ.2-0022', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6056509, 7.5451701, 0.0], [99.6065737, 7.5452084, 0.0], [99.6069093, 7.5453095, 0.0], [99.607158, 7.545488, 0.0], [99.6076098, 7.5458122, 0.0], [99.6076354, 7.5458306, 0.0], [99.6082972, 7.546357, 0.0], [99.608357, 7.5464046, 0.0], [99.6086261, 7.5466187, 0.0], [99.6086371, 7.5466275, 0.0], [99.608665, 7.5466383, 0.0], [99.6090387, 7.5467843, 0.0], [99.6095063, 7.5469209, 0.0], [99.6103704, 7.5471092, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.432', '2026-03-30 21:15:11.432', NULL);
INSERT INTO "public"."Map" VALUES (893, NULL, NULL, NULL, 34, NULL, 'ถนนหนองยวน', 'ตง.ถ.2-0023', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.5960538, 7.5543107, 0.0], [99.5977684, 7.5542258, 0.0], [99.5983157, 7.553979, 0.0], [99.5989375, 7.5537149, 0.0], [99.5998658, 7.5532844, 0.0], [99.6004618, 7.5530204, 0.0], [99.6006982, 7.5529199, 0.0], [99.6009419, 7.5528595, 0.0], [99.6010523, 7.5528637, 0.0], [99.60116, 7.5530051, 0.0], [99.6013139, 7.5533983, 0.0], [99.6014506, 7.5537472, 0.0], [99.6015524, 7.5538028, 0.0], [99.6016571, 7.5538256, 0.0], [99.6020142, 7.5539167, 0.0], [99.6029379, 7.5542372, 0.0], [99.6041525, 7.5545446, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.432', '2026-03-30 21:15:11.432', NULL);
INSERT INTO "public"."Map" VALUES (894, NULL, NULL, NULL, 35, NULL, 'ถนนสายน้ำผุดใต้(ผ่านสวนสมเด็จ)', 'ตง.ถ.2-0024', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.5965216, 7.5691423, 0.0], [99.5966751, 7.5681679, 0.0], [99.5967692, 7.567833, 0.0], [99.5969138, 7.5676511, 0.0], [99.5980124, 7.5669715, 0.0], [99.5981456, 7.5668469, 0.0], [99.5985534, 7.5663213, 0.0], [99.598967, 7.5657671, 0.0], [99.5993463, 7.5653203, 0.0], [99.5996039, 7.5649909, 0.0], [99.5998227, 7.5646215, 0.0], [99.5998756, 7.564487, 0.0], [99.5999746, 7.5635341, 0.0], [99.6000541, 7.5629532, 0.0], [99.6001182, 7.5626985, 0.0], [99.6002668, 7.5623035, 0.0], [99.6004154, 7.5619571, 0.0], [99.6004954, 7.5617309, 0.0], [99.6005209, 7.5614877, 0.0], [99.6004631, 7.5611588, 0.0], [99.6003427, 7.5607456, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.433', '2026-03-30 21:15:11.433', NULL);
INSERT INTO "public"."Map" VALUES (895, NULL, NULL, NULL, 38, NULL, 'ถนนสายควนวิเศษ', 'ตง.ถ.2-0029', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6146269, 7.5738243, 0.0], [99.6142719, 7.5742053, 0.0], [99.6140788, 7.574456, 0.0], [99.6138815, 7.5748425, 0.0], [99.6137842, 7.5750057, 0.0], [99.6136905, 7.5751167, 0.0], [99.6134584, 7.5752794, 0.0], [99.613235, 7.5754149, 0.0], [99.612778, 7.575683, 0.0], [99.6127495, 7.5757475, 0.0], [99.61286, 7.5769003, 0.0], [99.6129983, 7.5773379, 0.0], [99.6131307, 7.5776896, 0.0], [99.6134786, 7.5783643, 0.0], [99.6135636, 7.5786431, 0.0], [99.6136458, 7.5790364, 0.0], [99.6136576, 7.5792424, 0.0], [99.6136407, 7.5794341, 0.0], [99.6135844, 7.5802353, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.434', '2026-03-30 21:15:11.434', NULL);
INSERT INTO "public"."Map" VALUES (896, NULL, NULL, NULL, 39, NULL, 'ถนนสายควนหาญ', 'ตง.ถ.2-0030', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6134786, 7.5783643, 0.0], [99.6144057, 7.5775469, 0.0], [99.6151247, 7.5770366, 0.0], [99.6159211, 7.5765434, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.434', '2026-03-30 21:15:11.434', NULL);
INSERT INTO "public"."Map" VALUES (897, NULL, NULL, NULL, 40, NULL, 'ถนนสายราษฎร์อุทิศ (รอบรพ.ตรัง', 'ตง.ถ.2-0031', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6060651, 7.5537056, 0.0], [99.6070843, 7.553115, 0.0], [99.6080642, 7.5525986, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.435', '2026-03-30 21:15:11.435', NULL);
INSERT INTO "public"."Map" VALUES (925, NULL, NULL, NULL, 69, NULL, 'ถนนห้วยยอด ซอย 4', 'ตง.ถ.2-0061', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.5915191, 7.5420763, 0.0], [99.5915533, 7.5430145, 0.0], [99.5916111, 7.5447357, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.453', '2026-03-30 21:15:11.453', NULL);
INSERT INTO "public"."Map" VALUES (898, NULL, NULL, NULL, 41, NULL, 'ถนนสายราษฎร์อุทิศ 1', 'ตง.ถ.2-0032', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6217652, 7.565147, 0.0], [99.6216111, 7.5654944, 0.0], [99.6214567, 7.5657378, 0.0], [99.6210555, 7.5662455, 0.0], [99.6210402, 7.5662648, 0.0], [99.6209157, 7.5664224, 0.0], [99.6206695, 7.5666516, 0.0], [99.6203716, 7.5668895, 0.0], [99.6202965, 7.5669749, 0.0], [99.6202027, 7.5670815, 0.0], [99.6199382, 7.5675782, 0.0], [99.6198327, 7.5680018, 0.0], [99.6197704, 7.5685398, 0.0], [99.6196773, 7.5696143, 0.0], [99.6196503, 7.5697545, 0.0], [99.6195803, 7.5699234, 0.0], [99.6194557, 7.570018, 0.0], [99.6193391, 7.5701626, 0.0], [99.6191968, 7.570416, 0.0], [99.6189365, 7.5708699, 0.0], [99.6188418, 7.5727855, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.435', '2026-03-30 21:15:11.435', NULL);
INSERT INTO "public"."Map" VALUES (899, NULL, NULL, NULL, 42, NULL, 'ถนนสายราษฎร์อุทิศ 2', 'ตง.ถ.2-0033', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6189365, 7.5708699, 0.0], [99.6194946, 7.5711409, 0.0], [99.6199744, 7.5713283, 0.0], [99.6201995, 7.5713538, 0.0], [99.6206468, 7.571366, 0.0], [99.6212431, 7.571255, 0.0], [99.6216501, 7.5712001, 0.0], [99.6219655, 7.5711967, 0.0], [99.622043, 7.5712724, 0.0], [99.6220776, 7.571394, 0.0], [99.6220126, 7.5720493, 0.0], [99.6218962, 7.5728648, 0.0], [99.6216997, 7.5738007, 0.0], [99.6216268, 7.573951, 0.0], [99.6215081, 7.5741271, 0.0], [99.6214021, 7.5742074, 0.0], [99.6211476, 7.5741899, 0.0], [99.6203911, 7.5740271, 0.0], [99.6197471, 7.5738149, 0.0], [99.619529, 7.5736757, 0.0], [99.6194077, 7.5735143, 0.0], [99.6189882, 7.5728976, 0.0], [99.6188418, 7.5727855, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.436', '2026-03-30 21:15:11.436', NULL);
INSERT INTO "public"."Map" VALUES (900, NULL, NULL, NULL, 43, NULL, 'ถนนสายราษฎร์อุทิศ', 'ตง.ถ.2-0034', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6189365, 7.5708699, 0.0], [99.6181359, 7.5704047, 0.0], [99.6179293, 7.5703134, 0.0], [99.6177343, 7.5702965, 0.0], [99.6171609, 7.5703002, 0.0], [99.6161631, 7.5703188, 0.0], [99.615223, 7.5703267, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.437', '2026-03-30 21:15:11.437', NULL);
INSERT INTO "public"."Map" VALUES (901, NULL, NULL, NULL, 44, NULL, 'ถนนสายราษฎร์อุทิศ', 'ตง.ถ.2-0034', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6167008, 7.5733808, 0.0], [99.6175436, 7.5732623, 0.0], [99.6180595, 7.5731614, 0.0], [99.6188418, 7.5727855, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.437', '2026-03-30 21:15:11.437', NULL);
INSERT INTO "public"."Map" VALUES (902, NULL, NULL, NULL, 45, NULL, 'ถนนสายโคกขัน', 'ตง.ถ.2-0036', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6193216, 7.5792023, 0.0], [99.6195545, 7.5789429, 0.0], [99.6199023, 7.5785476, 0.0], [99.620074, 7.5783485, 0.0], [99.6202198, 7.5780293, 0.0], [99.6203199, 7.5778318, 0.0], [99.6206926, 7.5773191, 0.0], [99.6212148, 7.5765258, 0.0], [99.6213791, 7.576158, 0.0], [99.6213037, 7.5750422, 0.0], [99.6213017, 7.5746396, 0.0], [99.6213543, 7.5743548, 0.0], [99.6214021, 7.5742074, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.438', '2026-03-30 21:15:11.438', NULL);
INSERT INTO "public"."Map" VALUES (903, NULL, NULL, NULL, 46, NULL, 'ถนนขนานทางรถไฟ(ใต้)', 'ตง.ถ.2-0037', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6218962, 7.5728648, 0.0], [99.6226527, 7.5729989, 0.0], [99.6229538, 7.5730586, 0.0], [99.6233308, 7.5730266, 0.0], [99.6243601, 7.5730344, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.439', '2026-03-30 21:15:11.439', NULL);
INSERT INTO "public"."Map" VALUES (904, NULL, NULL, NULL, 47, NULL, 'ถนนสายบ้านโพธิ์', 'ตง.ถ.2-0039', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6195803, 7.5699234, 0.0], [99.6202356, 7.5695062, 0.0], [99.6209547, 7.569116, 0.0], [99.6210476, 7.5689085, 0.0], [99.6211276, 7.5687439, 0.0], [99.6212048, 7.5685528, 0.0], [99.6212733, 7.5683138, 0.0], [99.6213219, 7.5682522, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.439', '2026-03-30 21:15:11.439', NULL);
INSERT INTO "public"."Map" VALUES (905, NULL, NULL, NULL, 48, NULL, 'ถนนกันตังซอย 1', 'ตง.ถ.2-0040', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6046705, 7.5404394, 0.0], [99.6048768, 7.5421272, 0.0], [99.6049345, 7.5424018, 0.0], [99.6049979, 7.5426449, 0.0], [99.6051315, 7.5431153, 0.0], [99.6053751, 7.5440177, 0.0], [99.6056509, 7.5451701, 0.0], [99.6063051, 7.5479032, 0.0], [99.606378, 7.5488014, 0.0], [99.6063961, 7.5494108, 0.0], [99.6063824, 7.5499001, 0.0], [99.6062973, 7.5505211, 0.0], [99.6061862, 7.5510405, 0.0], [99.6061063, 7.5513353, 0.0], [99.6059419, 7.5516245, 0.0], [99.6058417, 7.5516759, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.44', '2026-03-30 21:15:11.44', NULL);
INSERT INTO "public"."Map" VALUES (906, NULL, NULL, NULL, 50, NULL, 'ถนนกันตังซอย 3', 'ตง.ถ.2-0042', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6222751, 7.580125, 0.0], [99.6229811, 7.5803056, 0.0], [99.6235003, 7.5804909, 0.0], [99.6241975, 7.5808103, 0.0], [99.6251472, 7.5812038, 0.0], [99.6274018, 7.5818614, 0.0], [99.6286415, 7.582532, 0.0], [99.6293531, 7.5828843, 0.0], [99.6299787, 7.5832553, 0.0], [99.6306043, 7.5836292, 0.0], [99.6313247, 7.5840788, 0.0], [99.6320739, 7.5846585, 0.0], [99.6328203, 7.5852869, 0.0], [99.6333512, 7.5856065, 0.0], [99.634014, 7.585926, 0.0], [99.6352163, 7.5865337, 0.0], [99.6363583, 7.587067, 0.0], [99.6372364, 7.5875092, 0.0], [99.6387726, 7.5889718, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.441', '2026-03-30 21:15:11.441', NULL);
INSERT INTO "public"."Map" VALUES (926, NULL, NULL, NULL, 70, NULL, 'ถนนห้วยยอด ซอย 5', 'ตง.ถ.2-0062', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6053178, 7.5626023, 0.0], [99.6055933, 7.5625421, 0.0], [99.6062583, 7.5623753, 0.0], [99.6068516, 7.5622371, 0.0], [99.6075595, 7.5620359, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.454', '2026-03-30 21:15:11.454', NULL);
INSERT INTO "public"."Map" VALUES (907, NULL, NULL, NULL, 51, NULL, 'ถนนกันตังซอย 6', 'ตง.ถ.2-0043', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6047621, 7.5571281, 0.0], [99.6049657, 7.5571392, 0.0], [99.6050926, 7.5571054, 0.0], [99.6052716, 7.5569849, 0.0], [99.6055694, 7.5567285, 0.0], [99.6059132, 7.5565091, 0.0], [99.6060822, 7.5563844, 0.0], [99.6061049, 7.5562127, 0.0], [99.6064057, 7.5560707, 0.0], [99.6066099, 7.5554996, 0.0], [99.6066607, 7.5553997, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.442', '2026-03-30 21:15:11.442', NULL);
INSERT INTO "public"."Map" VALUES (908, NULL, NULL, NULL, 52, NULL, 'ถนนกันตังซอย 7', 'ตง.ถ.2-0044', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6042868, 7.5560164, 0.0], [99.6051811, 7.5562389, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.443', '2026-03-30 21:15:11.443', NULL);
INSERT INTO "public"."Map" VALUES (909, NULL, NULL, NULL, 53, NULL, 'ถนนกันตังซอย 8', 'ตง.ถ.2-0045', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6053385, 7.5559225, 0.0], [99.6061049, 7.5562127, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.443', '2026-03-30 21:15:11.443', NULL);
INSERT INTO "public"."Map" VALUES (910, NULL, NULL, NULL, 54, NULL, 'ถนนกันตังซอย 9', 'ตง.ถ.2-0046', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6050836, 7.5511772, 0.0], [99.6052786, 7.5512027, 0.0], [99.6057232, 7.5510818, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.443', '2026-03-30 21:15:11.443', NULL);
INSERT INTO "public"."Map" VALUES (911, NULL, NULL, NULL, 55, NULL, 'ถนนกันตังซอย 10 (สุสาน)', 'ตง.ถ.2-0047', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6061035, 7.5542346, 0.0], [99.6063515, 7.5542025, 0.0], [99.606459, 7.5542152, 0.0], [99.6070159, 7.554698, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.444', '2026-03-30 21:15:11.444', NULL);
INSERT INTO "public"."Map" VALUES (912, NULL, NULL, NULL, 56, NULL, 'ถนนกันตังซอย 11', 'ตง.ถ.2-0048', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6047206, 7.5509588, 0.0], [99.6051043, 7.5505892, 0.0], [99.6051702, 7.5505663, 0.0], [99.6055422, 7.5504835, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.445', '2026-03-30 21:15:11.445', NULL);
INSERT INTO "public"."Map" VALUES (913, NULL, NULL, NULL, 57, NULL, 'ถนนกันตังซอย 12 (ซอยสินไชย)', 'ตง.ถ.2-0049', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6059336, 7.5524735, 0.0], [99.6065174, 7.5523776, 0.0], [99.6068198, 7.5523271, 0.0], [99.6070993, 7.5522552, 0.0], [99.6076252, 7.5521357, 0.0], [99.6079405, 7.5520502, 0.0], [99.6082171, 7.5519883, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.445', '2026-03-30 21:15:11.445', NULL);
INSERT INTO "public"."Map" VALUES (914, NULL, NULL, NULL, 58, NULL, 'ถนนกันตังซอย 13', 'ตง.ถ.2-0050', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6011786, 7.5511726, 0.0], [99.6020208, 7.5506164, 0.0], [99.6023874, 7.5503927, 0.0], [99.602459, 7.5503182, 0.0], [99.602479, 7.5502638, 0.0], [99.6024444, 7.5501065, 0.0], [99.6024644, 7.5500493, 0.0], [99.6026591, 7.5498745, 0.0], [99.6032992, 7.5493543, 0.0], [99.603461, 7.5492325, 0.0], [99.6035226, 7.5492081, 0.0], [99.6036143, 7.5491908, 0.0], [99.6038838, 7.5491446, 0.0], [99.6039955, 7.5490873, 0.0], [99.6047262, 7.5488173, 0.0], [99.6049039, 7.548777, 0.0], [99.6051018, 7.5487567, 0.0], [99.6053136, 7.5487799, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.446', '2026-03-30 21:15:11.446', NULL);
INSERT INTO "public"."Map" VALUES (915, NULL, NULL, NULL, 59, NULL, 'ถนนกันตังซอย 14', 'ตง.ถ.2-0051', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6058972, 7.5521374, 0.0], [99.6074965, 7.5518097, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.447', '2026-03-30 21:15:11.447', NULL);
INSERT INTO "public"."Map" VALUES (916, NULL, NULL, NULL, 60, NULL, 'ถนนกันตังซอย 15', 'ตง.ถ.2-0052', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6032562, 7.5426171, 0.0], [99.6031826, 7.5422797, 0.0], [99.6030413, 7.5416877, 0.0], [99.6028739, 7.5409126, 0.0], [99.6027512, 7.5402947, 0.0], [99.6026584, 7.5398387, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.448', '2026-03-30 21:15:11.448', NULL);
INSERT INTO "public"."Map" VALUES (917, NULL, NULL, NULL, 61, NULL, 'ถนนกันตังซอย 16', 'ตง.ถ.2-0053', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6019536, 7.5400155, 0.0], [99.6014304, 7.5383439, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.448', '2026-03-30 21:15:11.448', NULL);
INSERT INTO "public"."Map" VALUES (918, NULL, NULL, NULL, 62, NULL, 'ถนนกันตังซอย 18', 'ตง.ถ.2-0054', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6011348, 7.5403994, 0.0], [99.6014254, 7.5409532, 0.0], [99.6017388, 7.5415994, 0.0], [99.6021675, 7.5426831, 0.0], [99.6022303, 7.5428398, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.449', '2026-03-30 21:15:11.449', NULL);
INSERT INTO "public"."Map" VALUES (919, NULL, NULL, NULL, 63, NULL, 'ถนนกันตังซอย 20', 'ตง.ถ.2-0055', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6003564, 7.5391479, 0.0], [99.6007271, 7.539794, 0.0], [99.6009039, 7.5401156, 0.0], [99.6010608, 7.5404358, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.449', '2026-03-30 21:15:11.449', NULL);
INSERT INTO "public"."Map" VALUES (920, NULL, NULL, NULL, 64, NULL, 'ถนนกันตังซอย 22 (สวัสดิ์อุทิศ)', 'ตง.ถ.2-0056', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.5982751, 7.5411936, 0.0], [99.5983444, 7.5417299, 0.0], [99.5983879, 7.5421189, 0.0], [99.5984601, 7.542465, 0.0], [99.5985467, 7.5429513, 0.0], [99.5986508, 7.5434536, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.449', '2026-03-30 21:15:11.449', NULL);
INSERT INTO "public"."Map" VALUES (921, NULL, NULL, NULL, 65, NULL, 'ถนนกันตังซอย 24', 'ตง.ถ.2-0057', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.5951972, 7.5415944, 0.0], [99.5952479, 7.5422026, 0.0], [99.5954329, 7.5433182, 0.0], [99.595537, 7.5438716, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.45', '2026-03-30 21:15:11.45', NULL);
INSERT INTO "public"."Map" VALUES (922, NULL, NULL, NULL, 66, NULL, 'ถนนกันตังซอย 26', 'ตง.ถ.2-0058', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.5943986, 7.5415596, 0.0], [99.5944648, 7.5419719, 0.0], [99.594563, 7.5424439, 0.0], [99.5946386, 7.5432048, 0.0], [99.5947141, 7.5439686, 0.0], [99.5947289, 7.5441398, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.45', '2026-03-30 21:15:11.45', NULL);
INSERT INTO "public"."Map" VALUES (923, NULL, NULL, NULL, 67, NULL, 'ถนนห้วยยอด ซอย 2', 'ตง.ถ.2-0059', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.5932232, 7.5418312, 0.0], [99.5932821, 7.542437, 0.0], [99.5933578, 7.5433124, 0.0], [99.5933925, 7.5435241, 0.0], [99.593548, 7.5440332, 0.0], [99.5936997, 7.5444385, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.451', '2026-03-30 21:15:11.451', NULL);
INSERT INTO "public"."Map" VALUES (1051, 65, NULL, NULL, NULL, NULL, 'โรงแรม โกเต็ง', '77-79', '77-79 - พระราม 6 เมือง ตรัง', 7.556399, 99.60865, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (928, NULL, NULL, NULL, 72, NULL, 'ถนนห้วยยอด ซอย 8 (วังชา)', 'ตง.ถ.2-0064', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6054008, 7.5574196, 0.0], [99.6055862, 7.5580295, 0.0], [99.6056478, 7.5584558, 0.0], [99.6055924, 7.5595645, 0.0], [99.6055609, 7.5603117, 0.0], [99.6049552, 7.5606998, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.455', '2026-03-30 21:15:11.455', NULL);
INSERT INTO "public"."Map" VALUES (929, NULL, NULL, NULL, 73, NULL, 'ถนนห้วยยอด ซอย 8/1 (ซอยยุพา)', 'ตง.ถ.2-0065', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6021559, 7.5658772, 0.0], [99.604082, 7.5654025, 0.0], [99.6049503, 7.5651237, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.455', '2026-03-30 21:15:11.455', NULL);
INSERT INTO "public"."Map" VALUES (930, NULL, NULL, NULL, 74, NULL, 'ถนนห้วยยอด ซอย 9', 'ตง.ถ.2-0066', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6052453, 7.563104, 0.0], [99.605809, 7.5629982, 0.0], [99.6064281, 7.5628428, 0.0], [99.6071905, 7.5626558, 0.0], [99.6077738, 7.5625363, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.455', '2026-03-30 21:15:11.455', NULL);
INSERT INTO "public"."Map" VALUES (931, NULL, NULL, NULL, 75, NULL, 'ถนนห้วยยอด ซอย 10', 'ตง.ถ.2-0067', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.605204, 7.563434, 0.0], [99.6054053, 7.5634379, 0.0], [99.60552, 7.5634235, 0.0], [99.605821, 7.5633801, 0.0], [99.6067869, 7.5631642, 0.0], [99.6078991, 7.5629366, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.456', '2026-03-30 21:15:11.456', NULL);
INSERT INTO "public"."Map" VALUES (932, NULL, NULL, NULL, 76, NULL, 'ถนนห้วยยอด ซอย 11', 'ตง.ถ.2-0068', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6051505, 7.5640584, 0.0], [99.6053116, 7.5640618, 0.0], [99.6055208, 7.5640214, 0.0], [99.6069854, 7.5636131, 0.0], [99.60802, 7.5633313, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.456', '2026-03-30 21:15:11.456', NULL);
INSERT INTO "public"."Map" VALUES (933, NULL, NULL, NULL, 77, NULL, 'ถนนห้วยยอด ซอย 12', 'ตง.ถ.2-0069', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6015036, 7.5679896, 0.0], [99.6018878, 7.567989, 0.0], [99.6023809, 7.5679369, 0.0], [99.6031779, 7.56789, 0.0], [99.6045999, 7.5677707, 0.0], [99.6051686, 7.5677462, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.456', '2026-03-30 21:15:11.456', NULL);
INSERT INTO "public"."Map" VALUES (934, NULL, NULL, NULL, 78, NULL, 'ถนนห้วยยอด ซอย 13', 'ตง.ถ.2-0070', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.605382, 7.5681148, 0.0], [99.6058447, 7.5680551, 0.0], [99.6062088, 7.5680117, 0.0], [99.6066011, 7.5679456, 0.0], [99.6068079, 7.5679107, 0.0], [99.6075704, 7.5677723, 0.0], [99.607771, 7.5677234, 0.0], [99.607921, 7.5676511, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.457', '2026-03-30 21:15:11.457', NULL);
INSERT INTO "public"."Map" VALUES (935, NULL, NULL, NULL, 79, NULL, 'ถนนห้วยยอด ซอย 14', 'ตง.ถ.2-0071', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.603799, 7.5691223, 0.0], [99.6041517, 7.5691504, 0.0], [99.6046507, 7.5692098, 0.0], [99.6051533, 7.5692547, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.457', '2026-03-30 21:15:11.457', NULL);
INSERT INTO "public"."Map" VALUES (936, NULL, NULL, NULL, 80, NULL, 'ถนนห้วยยอด ซอย 16', 'ตง.ถ.2-0072', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6053383, 7.5688865, 0.0], [99.6054932, 7.5689025, 0.0], [99.6057111, 7.568885, 0.0], [99.6060322, 7.568833, 0.0], [99.6067562, 7.5686978, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.458', '2026-03-30 21:15:11.458', NULL);
INSERT INTO "public"."Map" VALUES (937, NULL, NULL, NULL, 81, NULL, 'ถนนห้วยยอด ซอย 17', 'ตง.ถ.2-0073', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6015057, 7.5694716, 0.0], [99.601867, 7.5694883, 0.0], [99.6022914, 7.569522, 0.0], [99.603295, 7.5695836, 0.0], [99.6040062, 7.569657, 0.0], [99.6050998, 7.5697678, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.459', '2026-03-30 21:15:11.459', NULL);
INSERT INTO "public"."Map" VALUES (938, NULL, NULL, NULL, 82, NULL, 'ถนนห้วยยอด ซอย 18 (สินไชย)', 'ตง.ถ.2-0074', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6052338, 7.5698226, 0.0], [99.6064015, 7.5696545, 0.0], [99.6064707, 7.5696788, 0.0], [99.6064993, 7.5697437, 0.0], [99.6065486, 7.5700726, 0.0], [99.6065776, 7.5704136, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.459', '2026-03-30 21:15:11.459', NULL);
INSERT INTO "public"."Map" VALUES (939, NULL, NULL, NULL, 83, NULL, 'ถนนห้วยยอด ซอย 19', 'ตง.ถ.2-0075', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6054799, 7.5737749, 0.0], [99.6059361, 7.5739631, 0.0], [99.6062489, 7.5741343, 0.0], [99.6065789, 7.5743256, 0.0], [99.6067869, 7.5744068, 0.0], [99.6069475, 7.5744338, 0.0], [99.6071783, 7.5744334, 0.0], [99.6074507, 7.5744216, 0.0], [99.6078161, 7.5743553, 0.0], [99.6080669, 7.5742705, 0.0], [99.6084825, 7.5741598, 0.0], [99.6085657, 7.5741797, 0.0], [99.6086805, 7.5742969, 0.0], [99.6089417, 7.5744968, 0.0], [99.6089583, 7.5750675, 0.0], [99.6089885, 7.5751405, 0.0], [99.609056, 7.5751733, 0.0], [99.609281, 7.57513, 0.0], [99.6099546, 7.5750204, 0.0], [99.6102642, 7.5749541, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.46', '2026-03-30 21:15:11.46', NULL);
INSERT INTO "public"."Map" VALUES (940, NULL, NULL, NULL, 84, NULL, 'ถนนห้วยยอด ซอย 21', 'ตง.ถ.2-0076', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6015016, 7.5706976, 0.0], [99.6017826, 7.5706829, 0.0], [99.6020235, 7.5706883, 0.0], [99.6029009, 7.5707529, 0.0], [99.6036092, 7.5708234, 0.0], [99.6040968, 7.5709172, 0.0], [99.6045355, 7.5709394, 0.0], [99.6051176, 7.5709758, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.46', '2026-03-30 21:15:11.46', NULL);
INSERT INTO "public"."Map" VALUES (941, NULL, NULL, NULL, 85, NULL, 'ถนนห้วยยอด ซอย 22', 'ตง.ถ.2-0077', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6047507, 7.5751678, 0.0], [99.6052387, 7.5755305, 0.0], [99.6056893, 7.5758618, 0.0], [99.6058672, 7.575976, 0.0], [99.6062518, 7.5762129, 0.0], [99.6069346, 7.5764923, 0.0], [99.607233, 7.5766235, 0.0], [99.6073077, 7.576735, 0.0], [99.607325, 7.5768322, 0.0], [99.6073183, 7.5771312, 0.0], [99.6073527, 7.5771884, 0.0], [99.6075177, 7.5772397, 0.0], [99.6088601, 7.577604, 0.0], [99.6101379, 7.577927, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.461', '2026-03-30 21:15:11.461', NULL);
INSERT INTO "public"."Map" VALUES (1052, 66, NULL, NULL, NULL, NULL, 'โรงแรม วัฒนา', '127/3-4', '127/3-4 - พระราม 6 เมือง ตรัง', 7.556644, 99.60914, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (942, NULL, NULL, NULL, 86, NULL, 'ถนนห้วยยอด ซอย 23', 'ตง.ถ.2-0078', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6014635, 7.5787466, 0.0], [99.6027142, 7.5789424, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.461', '2026-03-30 21:15:11.461', NULL);
INSERT INTO "public"."Map" VALUES (943, NULL, NULL, NULL, 87, NULL, 'ถนนห้วยยอด ซอย 24', 'ตง.ถ.2-0079', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6022803, 7.5869489, 0.0], [99.6043672, 7.5865569, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.462', '2026-03-30 21:15:11.462', NULL);
INSERT INTO "public"."Map" VALUES (944, NULL, NULL, NULL, 88, NULL, 'ถนนห้วยยอด ซอย 26', 'ตง.ถ.2-0080', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6041796, 7.5758152, 0.0], [99.6051957, 7.5765863, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.463', '2026-03-30 21:15:11.463', NULL);
INSERT INTO "public"."Map" VALUES (945, NULL, NULL, NULL, 89, NULL, 'ถนนห้วยยอด ซอย 30', 'ตง.ถ.2-0081', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.60175, 7.5888653, 0.0], [99.6020748, 7.5888195, 0.0], [99.602391, 7.5888255, 0.0], [99.6030906, 7.5888548, 0.0], [99.6044109, 7.5890138, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.463', '2026-03-30 21:15:11.463', NULL);
INSERT INTO "public"."Map" VALUES (946, NULL, NULL, NULL, 90, NULL, 'ถนนห้วยยอด ซอย 32', 'ตง.ถ.2-0082', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6061814, 7.5781614, 0.0], [99.6052425, 7.57725, 0.0], [99.6040196, 7.5762217, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.464', '2026-03-30 21:15:11.464', NULL);
INSERT INTO "public"."Map" VALUES (947, NULL, NULL, NULL, 91, NULL, 'ถนนห้วยยอด ซอยบ่อนไก่', 'ตง.ถ.2-0083', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6063612, 7.5795888, 0.0], [99.6045499, 7.5781665, 0.0], [99.6036027, 7.5774754, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.464', '2026-03-30 21:15:11.464', NULL);
INSERT INTO "public"."Map" VALUES (948, NULL, NULL, NULL, 92, NULL, 'ถนนห้วยยอด ซอยสิงห์ทอง', 'ตง.ถ.2-0084', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6028687, 7.5800583, 0.0], [99.6029871, 7.5800147, 0.0], [99.6030905, 7.5799847, 0.0], [99.603194, 7.5799771, 0.0], [99.6032629, 7.5799799, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.465', '2026-03-30 21:15:11.465', NULL);
INSERT INTO "public"."Map" VALUES (949, NULL, NULL, NULL, 93, NULL, 'ถนนพัทลุง ซอย 1', 'ตง.ถ.2-0085', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.603877, 7.5826931, 0.0], [99.6043627, 7.5826744, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.465', '2026-03-30 21:15:11.465', NULL);
INSERT INTO "public"."Map" VALUES (950, NULL, NULL, NULL, 94, NULL, 'ถนนพัทลุง ซอย 3', 'ตง.ถ.2-0086', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6041796, 7.5846616, 0.0], [99.6043985, 7.5846313, 0.0], [99.6046503, 7.584619, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.466', '2026-03-30 21:15:11.466', NULL);
INSERT INTO "public"."Map" VALUES (951, NULL, NULL, NULL, 95, NULL, 'ถนนประชาอุทิศ', 'ตง.ถ.2-0087', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6028884, 7.5747889, 0.0], [99.603518, 7.5747402, 0.0], [99.6044716, 7.5747448, 0.0], [99.6049395, 7.5747861, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.466', '2026-03-30 21:15:11.466', NULL);
INSERT INTO "public"."Map" VALUES (952, NULL, NULL, NULL, 96, NULL, 'ถนนพัทลุง ซอย 4', 'ตง.ถ.2-0088', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6093544, 7.5583388, 0.0], [99.6089222, 7.5590068, 0.0], [99.608584, 7.5594921, 0.0], [99.6081844, 7.5600088, 0.0], [99.6080744, 7.5601451, 0.0], [99.6079075, 7.5603518, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.467', '2026-03-30 21:15:11.467', NULL);
INSERT INTO "public"."Map" VALUES (953, NULL, NULL, NULL, 97, NULL, 'ถนนพัทลุง ซอย 5', 'ตง.ถ.2-0089', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6089469, 7.5605598, 0.0], [99.6089466, 7.5604072, 0.0], [99.6090332, 7.5601467, 0.0], [99.6092005, 7.5596857, 0.0], [99.6093557, 7.5591439, 0.0], [99.6095082, 7.5588175, 0.0], [99.6096381, 7.5585873, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.468', '2026-03-30 21:15:11.468', NULL);
INSERT INTO "public"."Map" VALUES (954, NULL, NULL, NULL, 98, NULL, 'ถนนพัทลุง ซอย 6', 'ตง.ถ.2-0090', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6152258, 7.558221, 0.0], [99.6149281, 7.5587516, 0.0], [99.6148803, 7.5589012, 0.0], [99.6148332, 7.5595087, 0.0], [99.6147894, 7.5603466, 0.0], [99.6148138, 7.5606398, 0.0], [99.6148865, 7.5611215, 0.0], [99.6148898, 7.5613429, 0.0], [99.6148866, 7.5616278, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.469', '2026-03-30 21:15:11.469', NULL);
INSERT INTO "public"."Map" VALUES (955, NULL, NULL, NULL, 99, NULL, 'ถนนพัทลุง ซอย 7', 'ตง.ถ.2-0091', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6166801, 7.5625991, 0.0], [99.6168728, 7.5620193, 0.0], [99.6169744, 7.5617379, 0.0], [99.6170098, 7.561319, 0.0], [99.6170535, 7.5604541, 0.0], [99.6171006, 7.5597928, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.469', '2026-03-30 21:15:11.469', NULL);
INSERT INTO "public"."Map" VALUES (956, NULL, NULL, NULL, 100, NULL, 'ถนนพัทลุง ซอย 9', 'ตง.ถ.2-0092', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6080744, 7.5601451, 0.0], [99.6089469, 7.5605598, 0.0], [99.6093309, 7.5607178, 0.0], [99.6095565, 7.5601669, 0.0], [99.6101288, 7.5589738, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.47', '2026-03-30 21:15:11.47', NULL);
INSERT INTO "public"."Map" VALUES (957, NULL, NULL, NULL, 101, NULL, 'ถนนพัทลุง ซอย 11', 'ตง.ถ.2-0093', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6187746, 7.5598663, 0.0], [99.6183263, 7.5608784, 0.0], [99.6177585, 7.5622466, 0.0], [99.6176811, 7.5626417, 0.0], [99.6173565, 7.563156, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.47', '2026-03-30 21:15:11.47', NULL);
INSERT INTO "public"."Map" VALUES (958, NULL, NULL, NULL, 102, NULL, 'ถนนพัทลุง ซอยข้างร้านAM.PM', 'ตง.ถ.2-0094', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6110243, 7.5595548, 0.0], [99.6100492, 7.5613239, 0.0], [99.6103687, 7.5614731, 0.0], [99.6098245, 7.562581, 0.0], [99.6097527, 7.5626948, 0.0], [99.6096179, 7.5627727, 0.0], [99.6092224, 7.5629618, 0.0], [99.6088117, 7.5631, 0.0], [99.60802, 7.5633313, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.471', '2026-03-30 21:15:11.471', NULL);
INSERT INTO "public"."Map" VALUES (977, NULL, NULL, NULL, 122, NULL, 'ถนนควนคีรี ซอย 1', 'ตง.ถ.2-0114', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6124829, 7.5615768, 0.0], [99.612177, 7.5620443, 0.0], [99.6118988, 7.5625234, 0.0], [99.6116895, 7.5629471, 0.0], [99.6116895, 7.5629471, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.481', '2026-03-30 21:15:11.481', NULL);
INSERT INTO "public"."Map" VALUES (978, NULL, NULL, NULL, 123, NULL, 'ถนนควนคีรี ซอย 3', 'ตง.ถ.2-0115', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6127198, 7.5617412, 0.0], [99.6125684, 7.562126, 0.0], [99.612313, 7.5627802, 0.0], [99.612156, 7.5631455, 0.0], [99.6119887, 7.5635826, 0.0], [99.6120218, 7.5636334, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.482', '2026-03-30 21:15:11.482', NULL);
INSERT INTO "public"."Map" VALUES (959, NULL, NULL, NULL, 103, NULL, 'ถนนบางรัก ซอย 2', 'ตง.ถ.2-0095', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.616564, 7.5625019, 0.0], [99.6164937, 7.5626988, 0.0], [99.6163625, 7.5632136, 0.0], [99.616276, 7.5635339, 0.0], [99.6162762, 7.5636596, 0.0], [99.6162376, 7.5639514, 0.0], [99.6162109, 7.5641339, 0.0], [99.6161556, 7.5642926, 0.0], [99.6160778, 7.564381, 0.0], [99.6159099, 7.5644456, 0.0], [99.6150735, 7.5645993, 0.0], [99.6150346, 7.5646443, 0.0], [99.6149277, 7.5653865, 0.0], [99.6148948, 7.5654404, 0.0], [99.614694, 7.5654916, 0.0], [99.6141586, 7.5658143, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.471', '2026-03-30 21:15:11.471', NULL);
INSERT INTO "public"."Map" VALUES (960, NULL, NULL, NULL, 104, NULL, 'ถนนบางรัก ซอย 3', 'ตง.ถ.2-0096', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.619206, 7.5637099, 0.0], [99.6194278, 7.5642004, 0.0], [99.6196564, 7.5647028, 0.0], [99.6198608, 7.5650616, 0.0], [99.6200951, 7.5653485, 0.0], [99.6204465, 7.5657161, 0.0], [99.6210555, 7.5662455, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.472', '2026-03-30 21:15:11.472', NULL);
INSERT INTO "public"."Map" VALUES (961, NULL, NULL, NULL, 105, NULL, 'ถนนบางรัก ซอย 4', 'ตง.ถ.2-0097', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6172133, 7.5630439, 0.0], [99.6169657, 7.5635703, 0.0], [99.6166134, 7.5646406, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.473', '2026-03-30 21:15:11.473', NULL);
INSERT INTO "public"."Map" VALUES (962, NULL, NULL, NULL, 106, NULL, 'ถนนบางรัก ซอย 5', 'ตง.ถ.2-0098', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.595623, 7.5595103, 0.0], [99.5940986, 7.5590905, 0.0], [99.5939367, 7.5591027, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.473', '2026-03-30 21:15:11.473', NULL);
INSERT INTO "public"."Map" VALUES (963, NULL, NULL, NULL, 107, NULL, 'ถนนบางรัก ซอย 6', 'ตง.ถ.2-0099', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.5958719, 7.5575607, 0.0], [99.6003005, 7.5585299, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.474', '2026-03-30 21:15:11.474', NULL);
INSERT INTO "public"."Map" VALUES (964, NULL, NULL, NULL, 108, NULL, 'ถนนบางรัก ซอย ข้างบ้านเลขที่38', 'ตง.ถ.2-0100', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.5957216, 7.5587179, 0.0], [99.5940689, 7.5582542, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.474', '2026-03-30 21:15:11.474', NULL);
INSERT INTO "public"."Map" VALUES (965, NULL, NULL, NULL, 109, NULL, 'ถนนจริงจิตร ซอย 2', 'ตง.ถ.2-0101', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.5959812, 7.5559759, 0.0], [99.5970072, 7.5560625, 0.0], [99.5981828, 7.5561686, 0.0], [99.5993854, 7.5562567, 0.0], [99.5998682, 7.5562859, 0.0], [99.6000331, 7.5562887, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.475', '2026-03-30 21:15:11.475', NULL);
INSERT INTO "public"."Map" VALUES (966, NULL, NULL, NULL, 110, NULL, 'ถนนจริงจิตร ซอย 4', 'ตง.ถ.2-0102', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.5938582, 7.5532813, 0.0], [99.5947995, 7.5533433, 0.0], [99.5953936, 7.5533481, 0.0], [99.5955423, 7.5533303, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.475', '2026-03-30 21:15:11.475', NULL);
INSERT INTO "public"."Map" VALUES (967, NULL, NULL, NULL, 111, NULL, 'ถนนจริงจิตร ซอยพล.ต.ต.สมพร', 'ตง.ถ.2-0103', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.5959492, 7.5567106, 0.0], [99.5970145, 7.5569736, 0.0], [99.5981662, 7.5571785, 0.0], [99.5991709, 7.5572908, 0.0], [99.6001726, 7.5574331, 0.0], [99.6005084, 7.5573847, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.476', '2026-03-30 21:15:11.476', NULL);
INSERT INTO "public"."Map" VALUES (968, NULL, NULL, NULL, 112, NULL, 'ถนนรักษ์จันทน์ ซอย 1', 'ตง.ถ.2-0104', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6033801, 7.5425955, 0.0], [99.6035138, 7.543308, 0.0], [99.6036032, 7.5439976, 0.0], [99.6038281, 7.5451298, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.476', '2026-03-30 21:15:11.476', NULL);
INSERT INTO "public"."Map" VALUES (969, NULL, NULL, NULL, 113, NULL, 'ถนนรักษ์จันทน์ ซอย 2', 'ตง.ถ.2-0105', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6028322, 7.5426943, 0.0], [99.6028668, 7.5427762, 0.0], [99.6029334, 7.5432295, 0.0], [99.6029836, 7.5437216, 0.0], [99.6030744, 7.5443439, 0.0], [99.6031774, 7.5450709, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.477', '2026-03-30 21:15:11.477', NULL);
INSERT INTO "public"."Map" VALUES (970, NULL, NULL, NULL, 114, NULL, 'ถนนรักษ์จันทน์ ซอย 3', 'ตง.ถ.2-0106', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.5986508, 7.5434536, 0.0], [99.598844, 7.5447447, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.477', '2026-03-30 21:15:11.477', NULL);
INSERT INTO "public"."Map" VALUES (971, NULL, NULL, NULL, 115, NULL, 'ถนนรักษ์จันทน์ ซอย 5', 'ตง.ถ.2-0107', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6152763, 7.5735468, 0.0], [99.6154571, 7.5741759, 0.0], [99.6156456, 7.5749671, 0.0], [99.6157648, 7.575492, 0.0], [99.6159143, 7.5762548, 0.0], [99.6159211, 7.5765434, 0.0], [99.6160365, 7.5767364, 0.0], [99.6172249, 7.5773661, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.478', '2026-03-30 21:15:11.478', NULL);
INSERT INTO "public"."Map" VALUES (972, NULL, NULL, NULL, 116, NULL, 'ถนนรักษ์จันทน์ ซอย 7 (ซอยผสมเทียม)', 'ตง.ถ.2-0108', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6170108, 7.5741657, 0.0], [99.6178712, 7.5743004, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.479', '2026-03-30 21:15:11.479', NULL);
INSERT INTO "public"."Map" VALUES (973, NULL, NULL, NULL, 118, NULL, 'ถนนอุดมลาภ ซอย 3', 'ตง.ถ.2-0110', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6176634, 7.5784125, 0.0], [99.6186647, 7.5779166, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.479', '2026-03-30 21:15:11.479', NULL);
INSERT INTO "public"."Map" VALUES (974, NULL, NULL, NULL, 119, NULL, 'ถนนอุดมลาภ ซอย 5', 'ตง.ถ.2-0111', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6178461, 7.576257, 0.0], [99.6172249, 7.5773661, 0.0], [99.6160924, 7.5791391, 0.0], [99.6156097, 7.5797345, 0.0], [99.6151689, 7.5802947, 0.0], [99.6135779, 7.5801997, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.48', '2026-03-30 21:15:11.48', NULL);
INSERT INTO "public"."Map" VALUES (975, NULL, NULL, NULL, 120, NULL, 'ถนนอุดมลาภ ซอย 7', 'ตง.ถ.2-0112', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6120378, 7.5607921, 0.0], [99.6116107, 7.5613075, 0.0], [99.6112964, 7.5616954, 0.0], [99.6109403, 7.5622001, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.48', '2026-03-30 21:15:11.48', NULL);
INSERT INTO "public"."Map" VALUES (976, NULL, NULL, NULL, 121, NULL, 'ถนนอุดมลาภ ซอย 9', 'ตง.ถ.2-0113', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6123141, 7.5613402, 0.0], [99.611829, 7.5619341, 0.0], [99.6114025, 7.5625481, 0.0], [99.6112918, 7.5627323, 0.0], [99.6108835, 7.5634001, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.481', '2026-03-30 21:15:11.481', NULL);
INSERT INTO "public"."Map" VALUES (1053, 67, NULL, NULL, NULL, NULL, 'ตลาดชินตา', '5', '5 - รัษฎา เมือง ตรัง', 7.556661, 99.61663, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (979, NULL, NULL, NULL, 124, NULL, 'ถนนควนคีรี ซอย 5', 'ตง.ถ.2-0116', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6133276, 7.5618736, 0.0], [99.6131984, 7.5623301, 0.0], [99.613103, 7.5627192, 0.0], [99.612936, 7.5633299, 0.0], [99.6128526, 7.563734, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.483', '2026-03-30 21:15:11.483', NULL);
INSERT INTO "public"."Map" VALUES (980, NULL, NULL, NULL, 125, NULL, 'ถนนแยกซอยควนคีรี', 'ตง.ถ.2-0117', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6120218, 7.5636334, 0.0], [99.6128526, 7.563734, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.483', '2026-03-30 21:15:11.483', NULL);
INSERT INTO "public"."Map" VALUES (981, NULL, NULL, NULL, 126, NULL, 'ถนนเพลินพิทักษ์ ซอย 1', 'ตง.ถ.2-0118', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6128526, 7.563734, 0.0], [99.6128289, 7.5639704, 0.0], [99.6128845, 7.5640242, 0.0], [99.6137865, 7.5640707, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.484', '2026-03-30 21:15:11.484', NULL);
INSERT INTO "public"."Map" VALUES (982, NULL, NULL, NULL, 127, NULL, 'ถนนเพลินพิทักษ์ ซอย 2', 'ตง.ถ.2-0119', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6138065, 7.5645006, 0.0], [99.6133844, 7.5645157, 0.0], [99.6130306, 7.5645311, 0.0], [99.6125388, 7.5645348, 0.0], [99.6118746, 7.5645208, 0.0], [99.6111758, 7.5644066, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.486', '2026-03-30 21:15:11.486', NULL);
INSERT INTO "public"."Map" VALUES (983, NULL, NULL, NULL, 128, NULL, 'ถนนเพลินพิทักษ์ ซอย 4', 'ตง.ถ.2-0120', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6141586, 7.5658143, 0.0], [99.6143232, 7.5663738, 0.0], [99.6142186, 7.5674361, 0.0], [99.6141921, 7.5678982, 0.0], [99.6141924, 7.5681199, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.487', '2026-03-30 21:15:11.487', NULL);
INSERT INTO "public"."Map" VALUES (984, NULL, NULL, NULL, 129, NULL, 'ถนนเพลินพิทักษ์ ซอย 6 (โกดำ)', 'ตง.ถ.2-0121', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6066011, 7.5679456, 0.0], [99.6067562, 7.5686978, 0.0], [99.6069467, 7.569622, 0.0], [99.6070342, 7.5700498, 0.0], [99.6070526, 7.5703161, 0.0], [99.6070895, 7.5704894, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.487', '2026-03-30 21:15:11.487', NULL);
INSERT INTO "public"."Map" VALUES (985, NULL, NULL, NULL, 130, NULL, 'ถนนเพลินพิทักษ์ ซอย 8', 'ตง.ถ.2-0122', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.61754, 7.5652397, 0.0], [99.6179448, 7.5656598, 0.0], [99.6182931, 7.5660064, 0.0], [99.6189386, 7.566556, 0.0], [99.6191412, 7.5666919, 0.0], [99.6194862, 7.5667917, 0.0], [99.6202965, 7.5669749, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.488', '2026-03-30 21:15:11.488', NULL);
INSERT INTO "public"."Map" VALUES (986, NULL, NULL, NULL, 131, NULL, 'ถนนเพลินพิทักษ์ ซอย 10', 'ตง.ถ.2-0123', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6158552, 7.5670796, 0.0], [99.6158552, 7.5670796, 0.0], [99.6163259, 7.5675558, 0.0], [99.6165872, 7.5677948, 0.0], [99.6169444, 7.5681085, 0.0], [99.6171391, 7.5679451, 0.0], [99.6177893, 7.5686474, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.488', '2026-03-30 21:15:11.488', NULL);
INSERT INTO "public"."Map" VALUES (987, NULL, NULL, NULL, 132, NULL, 'ถนนเพลินพิทักษ์ ซอย 14', 'ตง.ถ.2-0124', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6153799, 7.5675152, 0.0], [99.6159758, 7.5680425, 0.0], [99.6164382, 7.5684907, 0.0], [99.6164653, 7.5685745, 0.0], [99.6164716, 7.568745, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.489', '2026-03-30 21:15:11.489', NULL);
INSERT INTO "public"."Map" VALUES (988, NULL, NULL, NULL, 133, NULL, 'ถนนเพลินพิทักษ์ ซอยแยก ซอย 14', 'ตง.ถ.2-0125', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6141066, 7.5681555, 0.0], [99.614162, 7.5683204, 0.0], [99.6142499, 7.5690085, 0.0], [99.6143048, 7.5696397, 0.0], [99.6143039, 7.5700916, 0.0], [99.6142449, 7.5707993, 0.0], [99.6141679, 7.5714562, 0.0], [99.6141309, 7.5717877, 0.0], [99.6140762, 7.5718513, 0.0], [99.6139354, 7.5719421, 0.0], [99.6138947, 7.572281, 0.0], [99.6138834, 7.5727508, 0.0], [99.6138626, 7.5728974, 0.0], [99.6135945, 7.5741516, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.489', '2026-03-30 21:15:11.489', NULL);
INSERT INTO "public"."Map" VALUES (989, NULL, NULL, NULL, 134, NULL, 'ถนนเวียนกะพัง ซอย 1', 'ตง.ถ.2-0126', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6129376, 7.56914, 0.0], [99.6129548, 7.5692272, 0.0], [99.6129492, 7.5695564, 0.0], [99.6129257, 7.5698437, 0.0], [99.6128809, 7.5700352, 0.0], [99.6127823, 7.5702388, 0.0], [99.6127288, 7.5705681, 0.0], [99.6126099, 7.5713642, 0.0], [99.6124854, 7.5723338, 0.0], [99.6124652, 7.5729443, 0.0], [99.61246, 7.5734679, 0.0], [99.6123765, 7.5737972, 0.0], [99.6122601, 7.5742342, 0.0], [99.6121136, 7.5745516, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.49', '2026-03-30 21:15:11.49', NULL);
INSERT INTO "public"."Map" VALUES (990, NULL, NULL, NULL, 135, NULL, 'ถนนเวียนกะพัง ซอย 2', 'ตง.ถ.2-0127', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6089049, 7.5702054, 0.0], [99.6089659, 7.5709474, 0.0], [99.6089908, 7.5715637, 0.0], [99.6090213, 7.5719766, 0.0], [99.6090216, 7.5721981, 0.0], [99.609118, 7.5724732, 0.0], [99.6092411, 7.5726167, 0.0], [99.6099588, 7.5733069, 0.0], [99.6107996, 7.5741256, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.49', '2026-03-30 21:15:11.49', NULL);
INSERT INTO "public"."Map" VALUES (991, NULL, NULL, NULL, 136, NULL, 'ถนนเวียนกะพัง ซอย 4', 'ตง.ถ.2-0128', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6102642, 7.5749541, 0.0], [99.6103931, 7.5748681, 0.0], [99.6105906, 7.5746561, 0.0], [99.6108041, 7.5742067, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.491', '2026-03-30 21:15:11.491', NULL);
INSERT INTO "public"."Map" VALUES (992, NULL, NULL, NULL, 138, NULL, 'ถนนเวียนกะพัง ซอย 8', 'ตง.ถ.2-0130', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6228116, 7.5690058, 0.0], [99.6231626, 7.5688873, 0.0], [99.6235632, 7.5690955, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.491', '2026-03-30 21:15:11.491', NULL);
INSERT INTO "public"."Map" VALUES (993, NULL, NULL, NULL, 139, NULL, 'ถนนเวียนกะพัง ซอย 10', 'ตง.ถ.2-0131', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.624145, 7.5696804, 0.0], [99.6241309, 7.5702968, 0.0], [99.6236445, 7.5703169, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.492', '2026-03-30 21:15:11.492', NULL);
INSERT INTO "public"."Map" VALUES (1011, NULL, NULL, NULL, 159, NULL, 'ถนนรัษฎา ซอย 5', 'ตง.ถ.2-0151', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6115947, 7.55401, 0.0], [99.6139599, 7.5542769, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.502', '2026-03-30 21:15:11.502', NULL);
INSERT INTO "public"."Map" VALUES (994, NULL, NULL, NULL, 140, NULL, 'ถนนเวียนกะพัง ซอย 12', 'ตง.ถ.2-0132', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6247714, 7.5733743, 0.0], [99.6249742, 7.5733021, 0.0], [99.6255418, 7.5733858, 0.0], [99.6259617, 7.573433, 0.0], [99.6263952, 7.5735566, 0.0], [99.6266329, 7.5736109, 0.0], [99.6268885, 7.5736083, 0.0], [99.6271435, 7.5736408, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.493', '2026-03-30 21:15:11.493', NULL);
INSERT INTO "public"."Map" VALUES (995, NULL, NULL, NULL, 141, NULL, 'ถนนสังขวิทย์ ซอย 1', 'ตง.ถ.2-0133', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6263876, 7.5747177, 0.0], [99.6264408, 7.5745148, 0.0], [99.6265183, 7.574205, 0.0], [99.6266329, 7.5736109, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.494', '2026-03-30 21:15:11.494', NULL);
INSERT INTO "public"."Map" VALUES (996, NULL, NULL, NULL, 142, NULL, 'ถนนสังขวิทย์ ซอย 2', 'ตง.ถ.2-0134', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6264535, 7.5749348, 0.0], [99.6268732, 7.5749555, 0.0], [99.627527, 7.5750144, 0.0], [99.627686, 7.5750411, 0.0], [99.6277701, 7.5751368, 0.0], [99.6278602, 7.5752174, 0.0], [99.6283604, 7.5753207, 0.0], [99.6287451, 7.5754136, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.494', '2026-03-30 21:15:11.494', NULL);
INSERT INTO "public"."Map" VALUES (997, NULL, NULL, NULL, 143, NULL, 'ถนนสังขวิทย์ ซอย 3', 'ตง.ถ.2-0135', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6287451, 7.5754136, 0.0], [99.6290168, 7.5756571, 0.0], [99.6289698, 7.5763035, 0.0], [99.6285637, 7.577501, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.495', '2026-03-30 21:15:11.495', NULL);
INSERT INTO "public"."Map" VALUES (998, NULL, NULL, NULL, 144, NULL, 'ถนนสังขวิทย์ ซอย 4', 'ตง.ถ.2-0136', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6079508, 7.5667729, 0.0], [99.6077765, 7.5671784, 0.0], [99.6077783, 7.5673594, 0.0], [99.607921, 7.5676511, 0.0], [99.6079407, 7.5676914, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.495', '2026-03-30 21:15:11.495', NULL);
INSERT INTO "public"."Map" VALUES (999, NULL, NULL, NULL, 145, NULL, 'ถนนท่ากลาง ซอย 2', 'ตง.ถ.2-0137', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6081041, 7.5668774, 0.0], [99.6087294, 7.5658981, 0.0], [99.6091724, 7.565287, 0.0], [99.6091828, 7.5652107, 0.0], [99.6088252, 7.5646921, 0.0], [99.6084677, 7.5641899, 0.0], [99.6082181, 7.5637294, 0.0], [99.6080001, 7.5632899, 0.0], [99.6079519, 7.5631493, 0.0], [99.6078991, 7.5629366, 0.0], [99.6077738, 7.5625363, 0.0], [99.6075595, 7.5620359, 0.0], [99.6073891, 7.561648, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.496', '2026-03-30 21:15:11.496', NULL);
INSERT INTO "public"."Map" VALUES (1000, NULL, NULL, NULL, 146, NULL, 'ถนนท่ากลาง ซอย 6', 'ตง.ถ.2-0138', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6102983, 7.5673531, 0.0], [99.6103034, 7.5674023, 0.0], [99.610318, 7.5674803, 0.0], [99.6103293, 7.5680593, 0.0], [99.6103254, 7.5685066, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.496', '2026-03-30 21:15:11.496', NULL);
INSERT INTO "public"."Map" VALUES (1001, NULL, NULL, NULL, 147, NULL, 'ถนนท่ากลาง ซอย 8', 'ตง.ถ.2-0139', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6088783, 7.5672818, 0.0], [99.6091925, 7.5667682, 0.0], [99.6094946, 7.5662606, 0.0], [99.6098491, 7.5656586, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.496', '2026-03-30 21:15:11.496', NULL);
INSERT INTO "public"."Map" VALUES (1002, NULL, NULL, NULL, 148, NULL, 'ถนนวังตอ ซอย 1', 'ตง.ถ.2-0140', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.603696, 7.5583511, 0.0], [99.6038599, 7.5585873, 0.0], [99.6039903, 7.5585587, 0.0], [99.6041597, 7.5585555, 0.0], [99.6042917, 7.5585777, 0.0], [99.6044277, 7.5586074, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.497', '2026-03-30 21:15:11.497', NULL);
INSERT INTO "public"."Map" VALUES (1003, NULL, NULL, NULL, 150, NULL, 'ถนนวังตอ ซอย 2', 'ตง.ถ.2-0142', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.5955147, 7.5607968, 0.0], [99.5955254, 7.5609192, 0.0], [99.5955484, 7.5612618, 0.0], [99.595526, 7.5613313, 0.0], [99.5955185, 7.5613546, 0.0], [99.5953929, 7.5616061, 0.0], [99.5950684, 7.5621796, 0.0], [99.5946435, 7.5628923, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.498', '2026-03-30 21:15:11.498', NULL);
INSERT INTO "public"."Map" VALUES (1004, NULL, NULL, NULL, 151, NULL, 'ถนนวังตอ ซอย 2/2', 'ตง.ถ.2-0143', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6086261, 7.5466187, 0.0], [99.6088043, 7.5461836, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.498', '2026-03-30 21:15:11.498', NULL);
INSERT INTO "public"."Map" VALUES (1005, NULL, NULL, NULL, 152, NULL, 'ถนนวังตอ ซอย 3', 'ตง.ถ.2-0144', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.608357, 7.5464046, 0.0], [99.6085467, 7.545643, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.498', '2026-03-30 21:15:11.498', NULL);
INSERT INTO "public"."Map" VALUES (1006, NULL, NULL, NULL, 153, NULL, 'ถนนวังตอ ซอย 4', 'ตง.ถ.2-0145', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6082972, 7.546357, 0.0], [99.6082122, 7.5466429, 0.0], [99.6080185, 7.547463, 0.0], [99.6080069, 7.5477563, 0.0], [99.608011, 7.5485911, 0.0], [99.6079256, 7.5496924, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.499', '2026-03-30 21:15:11.499', NULL);
INSERT INTO "public"."Map" VALUES (1007, NULL, NULL, NULL, 154, NULL, 'ถนนวังตอ ซอย 4/1 (แยกวังตอซอย4)', 'ตง.ถ.2-0146', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.608665, 7.5466383, 0.0], [99.6086172, 7.546762, 0.0], [99.6085396, 7.5470464, 0.0], [99.6084861, 7.5473606, 0.0], [99.6084445, 7.547642, 0.0], [99.6084417, 7.5477886, 0.0], [99.6085229, 7.5479471, 0.0], [99.6085365, 7.5480398, 0.0], [99.6085442, 7.5482014, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.5', '2026-03-30 21:15:11.5', NULL);
INSERT INTO "public"."Map" VALUES (1008, NULL, NULL, NULL, 155, NULL, 'ถนนรัษฎา ซอย 1', 'ตง.ถ.2-0147', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.607158, 7.545488, 0.0], [99.6076511, 7.544181, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.501', '2026-03-30 21:15:11.501', NULL);
INSERT INTO "public"."Map" VALUES (1009, NULL, NULL, NULL, 156, NULL, 'ถนนรัษฎา ซอย 2', 'ตง.ถ.2-0148', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6076098, 7.5458122, 0.0], [99.6076098, 7.5458122, 0.0], [99.6075876, 7.5459466, 0.0], [99.6074804, 7.5465093, 0.0], [99.6072864, 7.5471947, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.501', '2026-03-30 21:15:11.501', NULL);
INSERT INTO "public"."Map" VALUES (1010, NULL, NULL, NULL, 158, NULL, 'ถนนรัษฎา ซอย 4', 'ตง.ถ.2-0150', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6142674, 7.5569083, 0.0], [99.615588, 7.5568257, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.502', '2026-03-30 21:15:11.502', NULL);
INSERT INTO "public"."Map" VALUES (1050, 64, NULL, NULL, NULL, NULL, 'โรงแรมทีเบิร์ด แกรนด์', '31', '31 ซอย 3 วิเศษกุล เมือง ตรัง', 7.556029, 99.61307, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1012, NULL, NULL, NULL, 160, NULL, 'ถนนรัษฎา ซอย 6', 'ตง.ถ.2-0152', NULL, NULL, NULL, NULL, '{"type": "LineString", "coordinates": [[99.6141664, 7.5564213, 0.0], [99.6157568, 7.5563227, 0.0]]}', NULL, NULL, '2026-03-30 21:15:11.503', '2026-03-30 21:15:11.503', NULL);
INSERT INTO "public"."Map" VALUES (1013, 27, NULL, NULL, NULL, NULL, 'สนามแบดมินตัน มาตีโต้', '43497', '43497 - เวียนกะพัง เมือง ตรัง', 7.566557, 99.62328, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1014, 28, NULL, NULL, NULL, NULL, 'โรงเรียนดรุโนทัย', '49', '49 - เจิมปัญญา เมือง ตรัง', 7.5572694, 99.6169649, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1015, 29, NULL, NULL, NULL, NULL, 'สถานีบริการน้ำมันเชื้อเพลิง ซัสโก้', '387', '387 - กันตัง เมือง ตรัง', 7.540903, 99.59839, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1016, 30, NULL, NULL, NULL, NULL, 'สถานีบริการน้ำมันเชื้อเพลิง บางจาก', '115/49', '115/49 - รัษฎา เมือง ตรัง', 7.542985, 99.61618, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1017, 31, NULL, NULL, NULL, NULL, 'The Room Hotel & Service Apartment', '150/9', '150/9 ซอย 13 วิเศษกุล เมือง ตรัง', 7.544791, 99.61162, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1018, 32, NULL, NULL, NULL, NULL, 'บริษัท ศรีตรังแอโกร อินดัสทรี จำกัด (มหาชน)', '38365', '38365 - จริงจิตร เมือง ตรัง', 7.545062, 99.59544, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1019, 33, NULL, NULL, NULL, NULL, 'บิ๊กซี ซุปเปอร์เซ็นเตอร์', '102/2', '102/2 - รัษฎา เมือง ตรัง', 7.545333, 99.61509, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1020, 34, NULL, NULL, NULL, NULL, NULL, '20/35', '20/35 - บางรัก เมือง ตรัง', 7.546957, 99.5922, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1021, 35, NULL, NULL, NULL, NULL, 'โรงแรม บีบี ตรัง', '46/38', '46/38 ซอย 4 วังตอ เมือง ตรัง', 7.546983, 99.60714, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1022, 36, NULL, NULL, NULL, NULL, 'โรงแรม เฌอแตม', '105/39', '105/39 - รัษฎา เมือง ตรัง', 7.547587, 99.61567, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1023, 37, NULL, NULL, NULL, NULL, 'โรงแรม ดีดี เรสซิเด้นท์', '105/275', '105/275 - ศรีตรัง 1 เมือง ตรัง', 7.547822, 99.61757, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1024, 38, NULL, NULL, NULL, NULL, 'สถานีบริการน้ำมันเชื้อเพลิง บางจาก2', '101/20', '101/20 - รัษฎา เมือง ตรัง', 7.547995, 99.61515, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1025, 39, NULL, NULL, NULL, NULL, 'สถานีบริการน้ำมันเชื้อเพลิง susco', '255/15', '255/15 - กันตัง เมือง ตรัง', 7.548472, 99.60559, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1026, 40, NULL, NULL, NULL, NULL, 'Namthip Residence Hotel', '206/48', '206/48 - วิเศษกุล เมือง ตรัง', 7.548707, 99.60969, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1027, 41, NULL, NULL, NULL, NULL, 'สถานีบริการน้ำมันเชื้อเพลิง ป.ต.ท', '98', '98 - รัษฎา เมือง ตรัง', 7.549037, 99.6142, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1028, 42, NULL, NULL, NULL, NULL, '86', '105/345', '105/345 - ศรีตรัง 1 เมือง ตรัง', 7.5493642, 99.6198139, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1029, 43, NULL, NULL, NULL, NULL, 'T&B Apartment', '69', '69 ซอย 7 วิเศษกุล เมือง ตรัง', 7.551126, 99.61199, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1030, 44, NULL, NULL, NULL, NULL, 'โรงแรมไรวินทร์ เพลส', '73/99', '73/99 ซอย 9 รัษฎา เมือง ตรัง', 7.551894, 99.61789, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1031, 45, NULL, NULL, NULL, NULL, 'ที่รัก', '133/125', '133/125 ซอย 9 รัษฎา เมือง ตรัง', 7.553032, 99.61799, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1032, 46, NULL, NULL, NULL, NULL, 'My Friends Hotel', '25/17-21', '25/17-21 - สถานี เมือง ตรัง', 7.55322, 99.60571, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1033, 47, NULL, NULL, NULL, NULL, 'warm up bar', '41/12', '41/12 - รัษฎา เมือง ตรัง', 7.553405, 99.61411, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1034, 48, NULL, NULL, NULL, NULL, 'โรงแรมอยู่สบาย', '64/214-215', '64/214-215 ซอย 2 พระราม 6 เมือง ตรัง', 7.55343, 99.60841, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1035, 49, NULL, NULL, NULL, NULL, 'ร้าน แฮงค์เอ้าท์', '39/33', '39/33 - รัษฎา เมือง ตรัง', 7.553447, 99.61455, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1036, 50, NULL, NULL, NULL, NULL, 'วาโนะเจแปน', '25/89', '25/89 - สถานี เมือง ตรัง', 7.553573, 99.60508, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1037, 51, NULL, NULL, NULL, NULL, 'Srisomboon Hostel', '147', '147 - กันตัง เมือง ตรัง', 7.5536818, 99.606272, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1038, 52, NULL, NULL, NULL, NULL, 'Ban Ao Thong', '25/28-31', '25/28-31 - สถานี เมือง ตรัง', 7.553924, 99.60493, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1039, 53, NULL, NULL, NULL, NULL, 'ตรังคอนโดมิเนียม', '118/8', '118/8 - บ้านหนองยวน เมือง ตรัง', 7.554067, 99.59849, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1040, 54, NULL, NULL, NULL, NULL, 'โรงแรมชมตรัง', '27', '27 - สถานี เมือง ตรัง', 7.554533, 99.60531, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1041, 55, NULL, NULL, NULL, NULL, 'โรงแรมเมซอง เดอ เชียร์', '24', '24 - สถานี เมือง ตรัง', 7.554792, 99.60505, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1042, 56, NULL, NULL, NULL, NULL, 'ไมตรี เฮ้าร์', '46240', '46240 - สถานี เมือง ตรัง', 7.554933, 99.60519, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1043, 57, NULL, NULL, NULL, NULL, 'โรงแรมธรรมรินทร์', '99', '99 - สถานี เมือง ตรัง', 7.555172, 99.6056, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1044, 58, NULL, NULL, NULL, NULL, 'โรงแรม ฮอลิเดย์', '37654', '37654 ซอย 1 วิเศษกุล เมือง ตรัง', 7.555267, 99.61054, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1045, 59, NULL, NULL, NULL, NULL, 'โรงแรม เมซอง เดอ เชียร์', '160/28', '160/28 - บ้านหนองยวน เมือง ตรัง', 7.555367, 99.60352, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1046, 60, NULL, NULL, NULL, NULL, 'เดอะ กลาสเฮาส์ เพลส', '23/36', '23/36 ซอย 7 รัษฎา เมือง ตรัง', 7.555386, 99.61483, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1047, 61, NULL, NULL, NULL, NULL, 'โรงแรมมิตรทาวน์', '23', '23 - พระราม 6 เมือง ตรัง', 7.5556399, 99.6069239, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1048, 62, NULL, NULL, NULL, NULL, 'บ้านควนหนุน เรสซิเด้นท์', '68/59', '68/59 - ควนขนุน เมือง ตรัง', 7.555925, 99.62589, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1049, 63, NULL, NULL, NULL, NULL, 'โรงแรม สเตชั่น', '118', '118 - สถานี เมือง ตรัง', 7.55602, 99.60453, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1054, 68, NULL, NULL, NULL, NULL, 'บลูออคิด รีสอร์ท', '33/89', '33/89 - ควนขัน เมือง ตรัง', 7.556918, 99.63093, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1055, 69, NULL, NULL, NULL, NULL, 'โรงพยาบาล ราชดำเนิน', '25', '25 - ไทรงาม เมือง ตรัง', 7.5574375, 99.6074052, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1056, 70, NULL, NULL, NULL, NULL, 'คุ้มโจโฉ', '65/50', '65/50 - ควนขนุน เมือง ตรัง', 7.55846, 99.62594, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1057, 71, NULL, NULL, NULL, NULL, 'โรงแรม S2S ควีนส์ ตรัง', '85', '85 - วิเศษกุล เมือง ตรัง', 7.558571, 99.60871, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1058, 72, NULL, NULL, NULL, NULL, 'ทักษิณ อพาร์ตเมนท์', '25/30', '25/30 - เจิมปัญญา เมือง ตรัง', 7.5586458, 99.6164279, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1059, 73, NULL, NULL, NULL, NULL, 'มูลนิธิแห่งสภาคริสตจักรในประเทศไทย', '24', '24 - ห้วยยอด เมือง ตรัง', 7.559318, 99.60487, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1060, 74, NULL, NULL, NULL, NULL, 'โรงเรียนตรังคริสเตียนศึกษา', '209', '209 - ท่ากลาง เมือง ตรัง', 7.560322, 99.59688, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1061, 75, NULL, NULL, NULL, NULL, 'สถานีบริการน้ำมันเชื้อเพลิง ท่ากลางปิโตรเลียม esso', '221/12', '221/12 - ท่ากลาง เมือง ตรัง', 7.560779, 99.59442, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1062, 76, NULL, NULL, NULL, NULL, 'สถานีบริการน้ำมันเชื้อเพลิง บางจาก-เมืองตรัง', '6', '6 - วิเศษกุล เมือง ตรัง', 7.561097, 99.6061, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1063, 77, NULL, NULL, NULL, NULL, 'โรงแรมธรรมรินทร์ ธนา', '69/8', '69/8 - ห้วยยอด เมือง ตรัง', 7.561162, 99.60372, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1064, 78, NULL, NULL, NULL, NULL, 'ห้างสิริบรรณ', '42', '42 - เจิมปัญญา เมือง ตรัง', 7.561282, 99.61585, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1065, 79, NULL, NULL, NULL, NULL, 'ปาล์มคอร์ด อภาทเม้นต์', '198', '198 - ท่ากลาง เมือง ตรัง', 7.56144, 99.59691, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1066, 80, NULL, NULL, NULL, NULL, 'โรงแรมบ้านบุษบา', '65/145', '65/145 ซอย 1 ห้วยยอด เมือง ตรัง', 7.561833, 99.60341, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1067, 81, NULL, NULL, NULL, NULL, 'ลีมาร์ทเอ็กซ์เพรส', '139/9', '139/9 - อุดมลาภ เมือง ตรัง', 7.562183, 99.61385, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1068, 82, NULL, NULL, NULL, NULL, 'Garden Hill Hotel', '175/1', '175/1 - อุดมลาภ เมือง ตรัง', 7.5623176, 99.6147827, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1069, 83, NULL, NULL, NULL, NULL, 'โรงแรมเซ็นเตอร์พ้อยท์', '108/84', '108/84 ซอย 7 พัทลุง เมือง ตรัง', 7.5627498, 99.609349, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1070, 84, NULL, NULL, NULL, NULL, 'วงแข เมนชั่น', '187/2-3', '187/2-3 - พัทลุง เมือง ตรัง', 7.563382, 99.61723, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1071, 85, NULL, NULL, NULL, NULL, 'สถานีบริการน้ำมันเชื้อเพลิง คาลเท็กซ์ สาขาตรัง', '125', '125 - ห้วยยอด เมือง ตรัง', 7.563463, 99.6049, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1072, 86, NULL, NULL, NULL, NULL, 'โรบินสัน ตรัง', '138', '138 - พัทลุง เมือง ตรัง', 7.563498, 99.62652, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1073, 87, NULL, NULL, NULL, NULL, 'โรงพยาบาลวัฒนแพทย์ ตรัง', '247/2', '247/2 - พัทลุง เมือง ตรัง', 7.563865, 99.61737, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1074, 88, NULL, NULL, NULL, NULL, 'โรงแรมอีโค่อินน์', '131/9', '131/9 - ห้วยยอด เมือง ตรัง', 7.564097, 99.6033, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1075, 89, NULL, NULL, NULL, NULL, 'คาลเท็กซ์ สาขาตรังคสุวรรณ (สาขา 1)', '235', '235 - พัทลุง เมือง ตรัง', 7.564416, 99.62128, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1076, 90, NULL, NULL, NULL, NULL, 'สถานีบริการน้ำมันเชื้อเพลิง เชลล์ ทับเที่ยง', '149', '149 - ห้วยยอด เมือง ตรัง', 7.564563, 99.60462, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1077, 91, NULL, NULL, NULL, NULL, 'โรงแรมเรือรัษฎา', '188', '188 - พัทลุง เมือง ตรัง', 7.564982, 99.63128, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1078, 92, NULL, NULL, NULL, NULL, 'มหานคร@ตรัง', '267/6', '267/6 - พัทลุง เมือง ตรัง', 7.565509, 99.62808, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1079, 93, NULL, NULL, NULL, NULL, 'ดูสบาย 2020', '46089', '46089 - โคกขัน เมือง ตรัง', 7.565666, 99.62226, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1080, 94, NULL, NULL, NULL, NULL, 'นันนทีโมเต็ล', '46034', '46034 - เพลินพิทักษ์ เมือง ตรัง', 7.566051, 99.61743, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1081, 95, NULL, NULL, NULL, NULL, 'โรงแรมช้างเรสซิเดนซ์ ตรัง', '33/46', '33/46 - เวียนกะพัง เมือง ตรัง', 7.567627, 99.62243, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1082, 96, NULL, NULL, NULL, NULL, 'โรงแรมรักษ์จันทร์', '20/2-20/7', '20/2-20/7 - เพลินพิทักษ์ เมือง ตรัง', 7.568432, 99.61523, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1083, 97, NULL, NULL, NULL, NULL, 'โรงพยาบาลตรังรวมแพทย์ (โรงพยาบาล TRPH)', '61/39', '61/39 - โคกขัน เมือง ตรัง', 7.56866, 99.61957, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1084, 98, NULL, NULL, NULL, NULL, 'โรงแรม ซี ซ่า', '65/51', '65/51 - เพลินพิทักษ์ เมือง ตรัง', 7.568829, 99.61071, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1085, 99, NULL, NULL, NULL, NULL, 'โรงแรมจรูญศักดิ์ แกรนด์ - Jaroonsak Grand Hotel', '69/99', '69/99 - เพลินพิทักษ์ เมือง ตรัง', 7.569775, 99.6085, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1086, 100, NULL, NULL, NULL, NULL, 'โรงแรมมิราเคิล อินน์ ตรัง', '85/46', '85/46 - โคกขัน เมือง ตรัง', 7.570278, 99.61886, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1087, 101, NULL, NULL, NULL, NULL, 'โรงแรมชมพูนครินทร์', '18/59', '18/59 - รักษ์จันทน์ เมือง ตรัง', 7.571623, 99.61751, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1088, 102, NULL, NULL, NULL, NULL, 'โรงแรมวัฒนาพาร์ค', '315/7', '315/7 - ห้วยยอด เมือง ตรัง', 7.572562, 99.60445, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1089, 103, NULL, NULL, NULL, NULL, 'ปั๊มน้ำมันพีที ตรัง2 (แยกวัดกุฏ)', '327/4-5', '327/4-5 - ห้วยยอด เมือง ตรัง', 7.572779, 99.60574, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1090, 104, NULL, NULL, NULL, NULL, 'อินญาวัฒน์แมนชั่น', '46290', '46290 - รักษ์จันทน์ เมือง ตรัง', 7.573442, 99.61508, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1091, 105, NULL, NULL, NULL, NULL, 'โรงแรม ณ ทับเที่ยง บูติค รีสอร์ท', '70/29', '70/29 - รักษ์จันทน์ เมือง ตรัง', 7.576015, 99.61818, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1092, 106, NULL, NULL, NULL, NULL, 'โรงแรมมายเฮ้าส์ การ์เดนท์ รีสอร์ท', '70/28', '70/28 - รักษ์จันทน์ เมือง ตรัง', 7.576297, 99.61892, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1093, 107, NULL, NULL, NULL, NULL, 'โรงแรม ปาล์มมี่ รีสอร์ท', '82/1', '82/1 ซอย 3 ราษฎร์อุทิศ เมือง ตรัง', 7.577716, 99.62097, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1094, 108, NULL, NULL, NULL, NULL, 'โรงแรมรื่นรมย์ รีสอร์ท', '384/76', '384/76 ซอย 18 ห้วยยอด เมือง ตรัง', 7.577826, 99.60893, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1095, 109, NULL, NULL, NULL, NULL, 'ห้างหุ้นส่วนจำกัด ปิชยดาปิโตรเลียม', '85', '85 - บ้านโพธิ์ เมือง ตรัง', 7.584404, 99.63134, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1096, 110, NULL, NULL, NULL, NULL, 'โรงเรียนปัญญาวิทย์ (แผนกมัธยม)', '46109', '46109 ซอย 10 เพลินพิทักษ์ เมือง ตรัง', 7.570465, 99.61209, NULL, NULL, NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', NULL);
INSERT INTO "public"."Map" VALUES (1099, NULL, NULL, NULL, NULL, NULL, 'ตึกแถว เลขที่ 143, 145 ถนนวิเศษกล', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.609806092703195, 7.55449904651098, 0.0], [99.609917079457304, 7.55449251787839, 0.0], [99.609914631220093, 7.55443212802691, 0.0], [99.610027250132305, 7.55442151899895, 0.0], [99.610023169736905, 7.55435378443581, 0.0], [99.609799564070599, 7.55437255425451, 0.0], [99.609806092703195, 7.55449904651098, 0.0]]]]}, "properties": {"Name": "ตึกแถว เลขที่ 143, 145 ถนนวิเศษกล"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 8);
INSERT INTO "public"."Map" VALUES (1097, NULL, NULL, NULL, NULL, NULL, 'อุโบสถวัดควนวิเศษ', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.608606862508907, 7.55232252970019, 0.0], [99.608815778751904, 7.55231518498853, 0.0], [99.608817410910007, 7.55221399118336, 0.0], [99.608603598192602, 7.55221807157873, 0.0], [99.608606862508907, 7.55232252970019, 0.0]]]]}, "properties": {"Name": "อุโบสถวัดควนวิเศษ"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 6);
INSERT INTO "public"."Map" VALUES (1098, NULL, NULL, NULL, NULL, NULL, '7-Eleven ถนนวิเศษกุล', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.609801196228801, 7.55389922839161, 0.0], [99.610027250132305, 7.55388861936365, 0.0], [99.610023985815999, 7.55372621962793, 0.0], [99.609793851517097, 7.5537303000233, 0.0], [99.609801196228801, 7.55389922839161, 0.0]]]]}, "properties": {"Name": "7-Eleven ถนนวิเศษกุล"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 7);
INSERT INTO "public"."Map" VALUES (1100, NULL, NULL, NULL, NULL, NULL, 'ศาลเจ้าพ่อหมื่นราม', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.610864547262196, 7.55451944848783, 0.0], [99.610980430490699, 7.55451700025061, 0.0], [99.610980430490699, 7.55451700025061, 0.0], [99.610982878727896, 7.55443620842228, 0.0], [99.610866995499407, 7.55443620842228, 0.0], [99.610864547262196, 7.55451944848783, 0.0]]]]}, "properties": {"Name": "ศาลเจ้าพ่อหมื่นราม"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 9);
INSERT INTO "public"."Map" VALUES (1101, NULL, NULL, NULL, NULL, NULL, 'ศาลเจ้าพ่อหมื่นราม', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.610912695927496, 7.55428441771453, 0.0], [99.611005728942004, 7.55429013026804, 0.0], [99.611013889732703, 7.55421749923046, 0.0], [99.611232598924502, 7.5542444298399, 0.0], [99.611248920506, 7.55410977679269, 0.0], [99.611036739946798, 7.55406815675992, 0.0], [99.611040820342097, 7.55398654885252, 0.0], [99.610949419485806, 7.55398002021993, 0.0], [99.610912695927496, 7.55428441771453, 0.0]]]]}, "properties": {"Name": "ศาลเจ้าพ่อหมื่นราม"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 10);
INSERT INTO "public"."Map" VALUES (1102, NULL, NULL, NULL, NULL, NULL, 'ศาลเจ้าพ่อหมื่นราม', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.611051429370093, 7.5538649530705, 0.0], [99.611375412762499, 7.55390902134049, 0.0], [99.611400711213804, 7.55374988592107, 0.0], [99.611068567030699, 7.553705001572, 0.0], [99.611051429370093, 7.5538649530705, 0.0]]]]}, "properties": {"Name": "ศาลเจ้าพ่อหมื่นราม"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 11);
INSERT INTO "public"."Map" VALUES (1103, NULL, NULL, NULL, NULL, NULL, 'อาคาร เลขที่ 146, 148
ถนนพระราม 6', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.610436680645293, 7.55696127479998, 0.0], [99.610505231287604, 7.55699106168618, 0.0], [99.610558684466895, 7.55688905180193, 0.0], [99.6104917659828, 7.55685681667851, 0.0], [99.610436680645293, 7.55696127479998, 0.0]]]]}, "properties": {"Name": "อาคาร เลขที่ 146, 148\nถนนพระราม 6"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 12);
INSERT INTO "public"."Map" VALUES (1104, NULL, NULL, NULL, NULL, NULL, 'บริษัท ตรังจังหวัดพาณิชย์ จำกัด', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.609390467272505, 7.55685804079712, 0.0], [99.609574085064096, 7.55697229186748, 0.0], [99.609641819627299, 7.55686783374601, 0.0], [99.609448408886706, 7.55676011130825, 0.0], [99.609390467272505, 7.55685804079712, 0.0]]]]}, "properties": {"Name": "บริษัท ตรังจังหวัดพาณิชย์ จำกัด"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 13);
INSERT INTO "public"."Map" VALUES (1105, NULL, NULL, NULL, NULL, NULL, 'อาคารไม้ เลขที่ 77, 79
ถนนพระราม 6', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.608458089447893, 7.55641099083467, 0.0], [99.608548674225105, 7.55646770833031, 0.0], [99.608616000748697, 7.55636406628792, 0.0], [99.608516439101706, 7.55631224526672, 0.0], [99.608458089447893, 7.55641099083467, 0.0]]]]}, "properties": {"Name": "อาคารไม้ เลขที่ 77, 79\nถนนพระราม 6"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 14);
INSERT INTO "public"."Map" VALUES (1106, NULL, NULL, NULL, NULL, NULL, 'ห้องแถวไม้ เลขที่ 53
ถนนพระราม 6', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.607918253140497, 7.55626287248274, 0.0], [99.607988435940797, 7.55628490661774, 0.0], [99.607988435940797, 7.55628490661774, 0.0], [99.608073308164506, 7.5560759903748, 0.0], [99.608012102233999, 7.5560417150537, 0.0], [99.607918253140497, 7.55626287248274, 0.0]]]]}, "properties": {"Name": "ห้องแถวไม้ เลขที่ 53\nถนนพระราม 6"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 15);
INSERT INTO "public"."Map" VALUES (1107, NULL, NULL, NULL, NULL, NULL, 'ตึกแถว เลขที่ 39 ถนนพระราม 6', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.607582436601504, 7.55601356032565, 0.0], [99.607634665662303, 7.55603273818388, 0.0], [99.607634665662303, 7.55603273818388, 0.0], [99.607687710802097, 7.55591767103445, 0.0], [99.607637929978594, 7.55589522885992, 0.0], [99.607582436601504, 7.55601356032565, 0.0], [99.607582436601504, 7.55601356032565, 0.0]]]]}, "properties": {"Name": "ตึกแถว เลขที่ 39 ถนนพระราม 6"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 16);
INSERT INTO "public"."Map" VALUES (1108, NULL, NULL, NULL, NULL, NULL, 'ตึกแถว เลขที่ 216, 218
ซอยราชดำเนิน 6', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.607346181709602, 7.55643180085106, 0.0], [99.607397594691307, 7.55643506516735, 0.0], [99.607397594691307, 7.55643506516735, 0.0], [99.607401675086606, 7.55638120394847, 0.0], [99.607446559435701, 7.55624818305941, 0.0], [99.607482466915002, 7.55624818305941, 0.0], [99.607481650835894, 7.55619105752424, 0.0], [99.607391882137804, 7.55619921831498, 0.0], [99.607353526421306, 7.55630530859459, 0.0], [99.607346181709602, 7.55643180085106, 0.0]]]]}, "properties": {"Name": "ตึกแถว เลขที่ 216, 218\nซอยราชดำเนิน 6"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 17);
INSERT INTO "public"."Map" VALUES (1109, NULL, NULL, NULL, NULL, NULL, 'ห้องแถวไม้ เลขที่ 121 ถนนราชดำเนิน ร้านตรังสโสโลว์', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.607102136155703, 7.55688441346982, 0.0], [99.607191904853806, 7.55682973617186, 0.0], [99.607088262811402, 7.55663469327318, 0.0], [99.606993597638805, 7.55668202585947, 0.0], [99.607102136155703, 7.55688441346982, 0.0]]]]}, "properties": {"Name": "ห้องแถวไม้ เลขที่ 121 ถนนราชดำเนิน ร้านตรังสโสโลว์"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 18);
INSERT INTO "public"."Map" VALUES (1132, NULL, NULL, NULL, NULL, NULL, 'เลขที่ 79/1 ถนนสถานี', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.603814440141903, 7.55671470119682, 0.0], [99.604005402645299, 7.55679222870885, 0.0], [99.604065792496698, 7.55666002389887, 0.0], [99.603873197835298, 7.55658657678221, 0.0], [99.603814440141903, 7.55671470119682, 0.0]]]]}, "properties": {"Name": "เลขที่ 79/1 ถนนสถานี"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 41);
INSERT INTO "public"."Map" VALUES (1110, NULL, NULL, NULL, NULL, NULL, 'ตึกแถว เลขที่ 88 ถนนราชดำเนิน', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.606969115266594, 7.55653839594245, 0.0], [99.607035217671594, 7.55651064925394, 0.0], [99.606937288182706, 7.55631968675063, 0.0], [99.606876898331194, 7.55634988167636, 0.0], [99.606969115266594, 7.55653839594245, 0.0]]]]}, "properties": {"Name": "ตึกแถว เลขที่ 88 ถนนราชดำเนิน"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 19);
INSERT INTO "public"."Map" VALUES (1111, NULL, NULL, NULL, NULL, NULL, 'ตึกแถว เลขที่ 154
ซอยราชดำเนิน 4', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.606756118628297, 7.55624460747582, 0.0], [99.606929943471002, 7.55614014935435, 0.0], [99.606851599879903, 7.55601039278159, 0.0], [99.606678591116307, 7.55611893129843, 0.0], [99.606756118628297, 7.55624460747582, 0.0], [99.606756118628297, 7.55624460747582, 0.0]]]]}, "properties": {"Name": "ตึกแถว เลขที่ 154\nซอยราชดำเนิน 4"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 20);
INSERT INTO "public"."Map" VALUES (1112, NULL, NULL, NULL, NULL, NULL, 'ตึกแถวเลขที่ 188, 190
ซอยราชดำเนิน 6', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.607041746304205, 7.55605527713066, 0.0], [99.607123354211595, 7.55608710421454, 0.0], [99.607123354211595, 7.55608710421454, 0.0], [99.607179663667694, 7.55598346217215, 0.0], [99.607102952234698, 7.55593939390215, 0.0], [99.607041746304205, 7.55605527713066, 0.0]]]]}, "properties": {"Name": "ตึกแถวเลขที่ 188, 190\nซอยราชดำเนิน 6"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 21);
INSERT INTO "public"."Map" VALUES (1113, NULL, NULL, NULL, NULL, NULL, 'ตึกแถว เลขที่ 33 ถนนพระราม 6', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.607193537011995, 7.55584880912494, 0.0], [99.607245766072694, 7.55586921110179, 0.0], [99.607304523766004, 7.55575659218958, 0.0], [99.607249846468093, 7.55573210981736, 0.0], [99.607193537011995, 7.55584880912494, 0.0]]]]}, "properties": {"Name": "ตึกแถว เลขที่ 33 ถนนพระราม 6"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 22);
INSERT INTO "public"."Map" VALUES (1114, NULL, NULL, NULL, NULL, NULL, 'อาคารตึกแถว 3 ขั้น ซอยราชดำเนิน 6', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.6069242309175, 7.55593857782308, 0.0], [99.606976459978299, 7.55596469235345, 0.0], [99.607015631773805, 7.55588553268327, 0.0], [99.606963402713106, 7.55586105031105, 0.0], [99.6069242309175, 7.55593857782308, 0.0]]]]}, "properties": {"Name": "อาคารตึกแถว 3 ขั้น ซอยราชดำเนิน 6"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 23);
INSERT INTO "public"."Map" VALUES (1115, NULL, NULL, NULL, NULL, NULL, 'ตึกแถว เลขที่ 25 ถนนพระราม 6', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.606807531609903, 7.55574598316162, 0.0], [99.606925046996594, 7.55578189064088, 0.0], [99.606998494113199, 7.55560724971904, 0.0], [99.606885875201002, 7.55555665281646, 0.0], [99.606807531609903, 7.55574598316162, 0.0]]]]}, "properties": {"Name": "ตึกแถว เลขที่ 25 ถนนพระราม 6"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 24);
INSERT INTO "public"."Map" VALUES (1116, NULL, NULL, NULL, NULL, NULL, 'ห้องแถวไม้ เลขที่ 114 ถนนพระราม 6', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.606587190259901, 7.5557655690594, 0.0], [99.606694912697705, 7.5557998443805, 0.0], [99.606787945712099, 7.55554033123498, 0.0], [99.606686751907006, 7.55550442375572, 0.0], [99.606587190259901, 7.5557655690594, 0.0]]]]}, "properties": {"Name": "ห้องแถวไม้ เลขที่ 114 ถนนพระราม 6"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 25);
INSERT INTO "public"."Map" VALUES (1117, NULL, NULL, NULL, NULL, NULL, 'อาคาร เลขที่ 134 ถนนพระราม 6', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.606453353291798, 7.55605446105158, 0.0], [99.606538225515493, 7.55609526500528, 0.0], [99.606629626371799, 7.55604303594455, 0.0], [99.606662269534795, 7.55593531350678, 0.0], [99.606515375301399, 7.55589450955308, 0.0], [99.606453353291798, 7.55605446105158, 0.0]]]]}, "properties": {"Name": "อาคาร เลขที่ 134 ถนนพระราม 6"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 26);
INSERT INTO "public"."Map" VALUES (1118, NULL, NULL, NULL, NULL, NULL, 'ห้องแถวไม้ เลขที่ 110 ชอยกันดัง 3', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.606095910657402, 7.55598101393493, 0.0], [99.606126921662195, 7.55602508220492, 0.0], [99.6062264833092, 7.55606915047492, 0.0], [99.606342366537703, 7.5560414037864, 0.0], [99.6062003687789, 7.55576720121754, 0.0], [99.606095910657402, 7.55598101393493, 0.0]]]]}, "properties": {"Name": "ห้องแถวไม้ เลขที่ 110 ชอยกันดัง 3"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 27);
INSERT INTO "public"."Map" VALUES (1119, NULL, NULL, NULL, NULL, NULL, 'ตึกแถว เลขที่ 101 ชอยกันตัง 3', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.605902729534606, 7.55639836244991, 0.0], [99.605939185472906, 7.55646359939212, 0.0], [99.606073496824493, 7.55636190651161, 0.0], [99.606086927959595, 7.55627940096705, 0.0], [99.605956454075198, 7.5562247170596, 0.0], [99.605915201302906, 7.55629762893619, 0.0], [99.605971803944001, 7.5563302474073, 0.0], [99.605902729534606, 7.55639836244991, 0.0]]]]}, "properties": {"Name": "ตึกแถว เลขที่ 101 ชอยกันตัง 3"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 28);
INSERT INTO "public"."Map" VALUES (1120, NULL, NULL, NULL, NULL, NULL, 'เลขที่ 51, 53, 55 ถนนกันตัง', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.605257075680001, 7.55626884793228, 0.0], [99.605480608143793, 7.55637725638037, 0.0], [99.605512267248102, 7.55629283210221, 0.0], [99.605394265132006, 7.55622759515999, 0.0], [99.605414411834801, 7.55617291125255, 0.0], [99.605370280962106, 7.55613453658066, 0.0], [99.605317515788201, 7.55613261784706, 0.0], [99.605257075680001, 7.55626884793228, 0.0]]]]}, "properties": {"Name": "เลขที่ 51, 53, 55 ถนนกันตัง"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 29);
INSERT INTO "public"."Map" VALUES (1121, NULL, NULL, NULL, NULL, NULL, 'กลุ่มตึกแถว ลขที่ 15, 17, 19, 21,23,25,27,29,31,31,33,35,37,39,41 ถนนกันกันตั้ง', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.604964468806799, 7.55692409545482, 0.0], [99.605056568019407, 7.55695767329272, 0.0], [99.605112211293601, 7.55681089017274, 0.0], [99.6051477078651, 7.55681089017274, 0.0], [99.605222668137401, 7.55669682153275, 0.0], [99.605325190722596, 7.55641371231867, 0.0], [99.605194921448899, 7.55635406832168, 0.0], [99.604964468806799, 7.55692409545482, 0.0]]]]}, "properties": {"Name": "กลุ่มตึกแถว ลขที่ 15, 17, 19, 21,23,25,27,29,31,31,33,35,37,39,41 ถนนกันกันตั้ง"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 30);
INSERT INTO "public"."Map" VALUES (1122, NULL, NULL, NULL, NULL, NULL, 'ตึกแถว เลขที่ 42, 44 ถนนนราชดำเนิน', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.605463418073697, 7.55735495513635, 0.0], [99.605541761664796, 7.5573190476571, 0.0], [99.605445464334096, 7.55709544199083, 0.0], [99.605362224268504, 7.55713461378638, 0.0], [99.605463418073697, 7.55735495513635, 0.0]]]]}, "properties": {"Name": "ตึกแถว เลขที่ 42, 44 ถนนนราชดำเนิน"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 31);
INSERT INTO "public"."Map" VALUES (1123, NULL, NULL, NULL, NULL, NULL, 'ตึกแถว เลขที่ 29, 31, 33 ถนนราชดำเนิน', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.605203319431396, 7.55783900862309, 0.0], [99.605319202659899, 7.5577949403531, 0.0], [99.605250652017702, 7.55759255274275, 0.0], [99.605138033105504, 7.55763009238015, 0.0], [99.605203319431396, 7.55783900862309, 0.0]]]]}, "properties": {"Name": "ตึกแถว เลขที่ 29, 31, 33 ถนนราชดำเนิน"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 32);
INSERT INTO "public"."Map" VALUES (1124, NULL, NULL, NULL, NULL, NULL, 'ตึกแถว เลขที่ 17, 19 ถนนราชดำเนิน', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.604940753596395, 7.55790870556709, 0.0], [99.605022361503799, 7.55787769456228, 0.0], [99.604963603810504, 7.55768183558453, 0.0], [99.604878731586794, 7.55770795011489, 0.0], [99.604940753596395, 7.55790870556709, 0.0]]]]}, "properties": {"Name": "ตึกแถว เลขที่ 17, 19 ถนนราชดำเนิน"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 33);
INSERT INTO "public"."Map" VALUES (1125, NULL, NULL, NULL, NULL, NULL, 'บ้านไทรงาม ถนนราชดำเนิน', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.604748034602594, 7.55808734619925, 0.0], [99.604947157896603, 7.55805307087814, 0.0], [99.604947157896603, 7.55795677354741, 0.0], [99.604730080863007, 7.55801879555704, 0.0], [99.604748034602594, 7.55808734619925, 0.0]]]]}, "properties": {"Name": "บ้านไทรงาม ถนนราชดำเนิน"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 34);
INSERT INTO "public"."Map" VALUES (1126, NULL, NULL, NULL, NULL, NULL, 'ตึกแถว เลขที่ 3, 5 ชอยห้วยยอด 2 ร้าน ทิพย์วิมล ดีไซน์ แอนด์ เดคอร์', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.604762724025903, 7.55838276682403, 0.0], [99.604832906826303, 7.55837297387514, 0.0], [99.604814953086603, 7.55818527568813, 0.0], [99.604739873811795, 7.55819343647887, 0.0], [99.604762724025903, 7.55838276682403, 0.0]]]]}, "properties": {"Name": "ตึกแถว เลขที่ 3, 5 ชอยห้วยยอด 2 ร้าน ทิพย์วิมล ดีไซน์ แอนด์ เดคอร์"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 35);
INSERT INTO "public"."Map" VALUES (1127, NULL, NULL, NULL, NULL, NULL, 'อาคารไม้เลขที่ 1 ถนนราชดำเนิน', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.6046729553278, 7.55807918540851, 0.0], [99.604725184388499, 7.55807102461777, 0.0], [99.604703966332593, 7.55799757750111, 0.0], [99.604677851802194, 7.55800737045, 0.0], [99.604619094108898, 7.55789964801223, 0.0], [99.604578290155203, 7.5579257625426, 0.0], [99.6046729553278, 7.55807918540851, 0.0]]]]}, "properties": {"Name": "อาคารไม้เลขที่ 1 ถนนราชดำเนิน"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 36);
INSERT INTO "public"."Map" VALUES (1128, NULL, NULL, NULL, NULL, NULL, 'ตึกแถว เลขที่ 10, 12
ถนนห้วยยอด', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.604384063335601, 7.55822771179997, 0.0], [99.604459142610395, 7.5581673219485, 0.0], [99.604369373912306, 7.55803674929666, 0.0], [99.604292662479295, 7.55809387483184, 0.0], [99.604384063335601, 7.55822771179997, 0.0]]]]}, "properties": {"Name": "ตึกแถว เลขที่ 10, 12\nถนนห้วยยอด"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 37);
INSERT INTO "public"."Map" VALUES (1129, NULL, NULL, NULL, NULL, NULL, 'ห้องแถวไม้ เลขที่ 16 ถนนท่ากลาง', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.604321225246906, 7.55826525143738, 0.0], [99.6043742703867, 7.55823097611627, 0.0], [99.604280421293197, 7.55810693209703, 0.0], [99.604233904786, 7.55814202349721, 0.0], [99.604321225246906, 7.55826525143738, 0.0]]]]}, "properties": {"Name": "ห้องแถวไม้ เลขที่ 16 ถนนท่ากลาง"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 38);
INSERT INTO "public"."Map" VALUES (1130, NULL, NULL, NULL, NULL, NULL, 'ตรัง เอฟบีที', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.604663162378898, 7.55724678475306, 0.0], [99.6047431381281, 7.55727616359972, 0.0], [99.604777413449199, 7.55720761295751, 0.0], [99.604692541225504, 7.5571733376364, 0.0], [99.604663162378898, 7.55724678475306, 0.0]]]]}, "properties": {"Name": "ตรัง เอฟบีที"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 39);
INSERT INTO "public"."Map" VALUES (1131, NULL, NULL, NULL, NULL, NULL, 'เลขที่ 152/5, 152/4 ชอยสถานี', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.604470567717399, 7.55695626060272, 0.0], [99.604612565476302, 7.55702154692864, 0.0], [99.604678667881302, 7.55687954916977, 0.0], [99.604539934438705, 7.55681671108107, 0.0], [99.604470567717399, 7.55695626060272, 0.0]]]]}, "properties": {"Name": "เลขที่ 152/5, 152/4 ชอยสถานี"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 40);
INSERT INTO "public"."Map" VALUES (1133, NULL, NULL, NULL, NULL, NULL, 'ตึกแถว เลขที่ 43, 45, 47, 49, 51 ถนนทากลาง', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.603353355465103, 7.55859331522511, 0.0], [99.603541869731202, 7.55846600688957, 0.0], [99.603437411609704, 7.55829299812589, 0.0], [99.603325608776601, 7.55836970955884, 0.0], [99.603291333455502, 7.558327273447, 0.0], [99.603219518496999, 7.55838195074495, 0.0], [99.603353355465103, 7.55859331522511, 0.0]]]]}, "properties": {"Name": "ตึกแถว เลขที่ 43, 45, 47, 49, 51 ถนนทากลาง"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 42);
INSERT INTO "public"."Map" VALUES (1134, NULL, NULL, NULL, NULL, NULL, 'อาคารโรงพยาบาลตรังชาตะสงเคราะห์ ถนนห้วยยอด', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.604511938212497, 7.55887537305385, 0.0], [99.604657200287704, 7.55888190168644, 0.0], [99.604657200287704, 7.55888190168644, 0.0], [99.604665146366102, 7.55870947706455, 0.0], [99.604523160080106, 7.55871235516495, 0.0], [99.604511938212497, 7.55887537305385, 0.0]]]]}, "properties": {"Name": "อาคารโรงพยาบาลตรังชาตะสงเคราะห์ ถนนห้วยยอด"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 43);
INSERT INTO "public"."Map" VALUES (1135, NULL, NULL, NULL, NULL, NULL, 'วิหารคริสตจักรตรัง', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.604823668072797, 7.55938938471111, 0.0], [99.605011366259902, 7.55933062701778, 0.0], [99.604985251729502, 7.55924249047779, 0.0], [99.604792657068003, 7.55929308738038, 0.0], [99.604823668072797, 7.55938938471111, 0.0]]]]}, "properties": {"Name": "วิหารคริสตจักรตรัง"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 44);
INSERT INTO "public"."Map" VALUES (1136, NULL, NULL, NULL, NULL, NULL, 'ห้องแถวไม้เลขที่ 4 ถึง 28
(ข้างโรงเรียนวัฒนาศึกษา) ถนนวิเศษกุล', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.606046416409299, 7.55951466849963, 0.0], [99.606358158615507, 7.55951630065778, 0.0], [99.606358158615507, 7.55941184253631, 0.0], [99.606212896540399, 7.55941673901076, 0.0], [99.606209632224093, 7.55937430289891, 0.0], [99.606087220362994, 7.55938246368965, 0.0], [99.606080691730398, 7.55941673901076, 0.0], [99.606046416409299, 7.55941021037817, 0.0], [99.606046416409299, 7.55951466849963, 0.0]]]]}, "properties": {"Name": "ห้องแถวไม้เลขที่ 4 ถึง 28\n(ข้างโรงเรียนวัฒนาศึกษา) ถนนวิเศษกุล"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 45);
INSERT INTO "public"."Map" VALUES (1137, NULL, NULL, NULL, NULL, NULL, 'ห้องแถวไม้เลขที่ 4 ถึง 28
(ข้างโรงเรียนวัฒนาศึกษา) ถนนวิเศษกุล', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.606532799537305, 7.55974317064035, 0.0], [99.606622568235494, 7.55965829841665, 0.0], [99.606475674002198, 7.55949671476001, 0.0], [99.606394066094794, 7.55957505835111, 0.0], [99.606532799537305, 7.55974317064035, 0.0], [99.606532799537305, 7.55974317064035, 0.0]]]]}, "properties": {"Name": "ห้องแถวไม้เลขที่ 4 ถึง 28\n(ข้างโรงเรียนวัฒนาศึกษา) ถนนวิเศษกุล"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 46);
INSERT INTO "public"."Map" VALUES (1138, NULL, NULL, NULL, NULL, NULL, 'ห้องแถวไม้ เลขที่ 10/9 ชอยวิเศษกุล 2', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.605904418650397, 7.56050865281174, 0.0], [99.606044784251097, 7.56040256253212, 0.0], [99.605977865767102, 7.56030952951769, 0.0], [99.605842396640796, 7.5604156197973, 0.0], [99.605904418650397, 7.56050865281174, 0.0], [99.605904418650397, 7.56050865281174, 0.0]]]]}, "properties": {"Name": "ห้องแถวไม้ เลขที่ 10/9 ชอยวิเศษกุล 2"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 47);
INSERT INTO "public"."Map" VALUES (1139, NULL, NULL, NULL, NULL, NULL, 'ตึกแถว เลขที่ 33, 35, 37, 39,
41, 43 ถนนวิเศษกุล', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.6077324357761, 7.55981661775701, 0.0], [99.607853215479096, 7.55964687330962, 0.0], [99.607719378510893, 7.55952772576482, 0.0], [99.607585541542804, 7.55969583805406, 0.0], [99.6077324357761, 7.55981661775701, 0.0]]]]}, "properties": {"Name": "ตึกแถว เลขที่ 33, 35, 37, 39,\n41, 43 ถนนวิเศษกุล"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 48);
INSERT INTO "public"."Map" VALUES (1140, NULL, NULL, NULL, NULL, NULL, 'ศาลเจ้ากิวอ่องเอี่ย (โรงพระกินผัก)', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.599037929321995, 7.5598639503433, 0.0], [99.599212570243793, 7.55985905386885, 0.0], [99.599219098876404, 7.55975296358923, 0.0], [99.5990411936383, 7.55975459574738, 0.0], [99.599037929321995, 7.5598639503433, 0.0]]]]}, "properties": {"Name": "ศาลเจ้ากิวอ่องเอี่ย (โรงพระกินผัก)"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 49);
INSERT INTO "public"."Map" VALUES (1141, NULL, NULL, NULL, NULL, NULL, 'อุโบสถวัดมัชฌิมภูมิ', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.602179833756793, 7.55474550239133, 0.0], [99.602302245617906, 7.55479120281947, 0.0], [99.602344681729704, 7.55471285922837, 0.0], [99.602222269868605, 7.55466226232578, 0.0], [99.602179833756793, 7.55474550239133, 0.0]]]]}, "properties": {"Name": "อุโบสถวัดมัชฌิมภูมิ"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 50);
INSERT INTO "public"."Map" VALUES (1142, NULL, NULL, NULL, NULL, NULL, 'สถานีรถไฟตรัง', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.604316091580699, 7.55484771729292, 0.0], [99.604414021069601, 7.55486893534885, 0.0], [99.604525007823696, 7.55459799709629, 0.0], [99.604603351414795, 7.55461921515221, 0.0], [99.604622937312499, 7.55456698609148, 0.0], [99.604652316159203, 7.55456861824962, 0.0], [99.604737188382899, 7.55438092006261, 0.0], [99.6046327302614, 7.55433521963447, 0.0], [99.604771463703997, 7.55405122411672, 0.0], [99.604673534215095, 7.55400878800488, 0.0], [99.604316091580699, 7.55484771729292, 0.0]]]]}, "properties": {"Name": "สถานีรถไฟตรัง"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 51);
INSERT INTO "public"."Map" VALUES (1143, NULL, NULL, NULL, NULL, NULL, 'โรงแรมศรีตรัง ถนนพระราม 6', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.604947736783998, 7.55492606088403, 0.0], [99.605047298431003, 7.55496523267958, 0.0], [99.605138699287295, 7.55479712039034, 0.0], [99.605034241165797, 7.55474652348775, 0.0], [99.604947736783998, 7.55492606088403, 0.0]]]]}, "properties": {"Name": "โรงแรมศรีตรัง ถนนพระราม 6"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 52);
INSERT INTO "public"."Map" VALUES (1144, NULL, NULL, NULL, NULL, NULL, 'ไปรษณีย์ไทย สาขาทับเที่ยง', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.605833949274597, 7.55523593374039, 0.0], [99.605969418400903, 7.55528979495928, 0.0], [99.605969418400903, 7.55528816280113, 0.0], [99.6060200153035, 7.55519676194484, 0.0], [99.605917189340204, 7.555154325833, 0.0], [99.605858431646894, 7.55517554388892, 0.0], [99.605833949274597, 7.55523593374039, 0.0]]]]}, "properties": {"Name": "ไปรษณีย์ไทย สาขาทับเที่ยง"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 53);
INSERT INTO "public"."Map" VALUES (1145, NULL, NULL, NULL, NULL, NULL, 'ธนาคารกรุงเทพ เลขที่ 2
ถนนพระราม 6', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.605971400734802, 7.55488491822749, 0.0], [99.606090548279596, 7.55493877944637, 0.0], [99.606090548279596, 7.55493877944637, 0.0], [99.606159915000902, 7.55480657463639, 0.0], [99.606042399614196, 7.55475108125936, 0.0], [99.605971400734802, 7.55488491822749, 0.0], [99.605971400734802, 7.55488491822749, 0.0], [99.605971400734802, 7.55488491822749, 0.0]]]]}, "properties": {"Name": "ธนาคารกรุงเทพ เลขที่ 2\nถนนพระราม 6"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 54);
INSERT INTO "public"."Map" VALUES (1146, NULL, NULL, NULL, NULL, NULL, 'ตึกแถวเลขที่ 152, 154 ถนนกันตัง', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.605698830324101, 7.5543454899596, 0.0], [99.605986090158098, 7.55447443045328, 0.0], [99.606054640800295, 7.55436834017367, 0.0], [99.605769013124402, 7.55422960673109, 0.0], [99.605698830324101, 7.5543454899596, 0.0]]]]}, "properties": {"Name": "ตึกแถวเลขที่ 152, 154 ถนนกันตัง"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 55);
INSERT INTO "public"."Map" VALUES (1147, NULL, NULL, NULL, NULL, NULL, 'ตึกแถว เลขที่ 158, 160 ถนนกันตั้ง ร้านเอเซียโอซา', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.605731473486998, 7.55416268824703, 0.0], [99.606012204688497, 7.55429326089886, 0.0], [99.606051376484004, 7.55421002083332, 0.0], [99.605780438231406, 7.55407455170704, 0.0], [99.605731473486998, 7.55416268824703, 0.0]]]]}, "properties": {"Name": "ตึกแถว เลขที่ 158, 160 ถนนกันตั้ง ร้านเอเซียโอซา"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 56);
INSERT INTO "public"."Map" VALUES (1148, NULL, NULL, NULL, NULL, NULL, 'ตึกแถว เลขที่ 158, 160, 162, 164, 166, 168 ถนนราชดำเนิน', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.608535989832305, 7.55737779113387, 0.0], [99.608686148381906, 7.55722844866333, 0.0], [99.608507410389194, 7.55703346326971, 0.0], [99.608357749168803, 7.55718312449009, 0.0], [99.608535989832305, 7.55737779113387, 0.0]]]]}, "properties": {"Name": "ตึกแถว เลขที่ 158, 160, 162, 164, 166, 168 ถนนราชดำเนิน"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 57);
INSERT INTO "public"."Map" VALUES (1149, NULL, NULL, NULL, NULL, NULL, 'ตึกแถว เลขที่ 182, 184, 186
ถนนราชดำเนิน', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.608735739686907, 7.55757454614337, 0.0], [99.608896913308797, 7.55741433188823, 0.0], [99.608847026235395, 7.5573529324132, 0.0], [99.608672299729506, 7.55751752098101, 0.0], [99.608735739686907, 7.55757454614337, 0.0]]]]}, "properties": {"Name": "ตึกแถว เลขที่ 182, 184, 186\nถนนราชดำเนิน"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 58);
INSERT INTO "public"."Map" VALUES (1150, NULL, NULL, NULL, NULL, NULL, 'ห้องแถวไม้ เลขที่ 275, 277, 279, 281, 283, 285 ถนนราชดำเนิน', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.608748145699707, 7.55826582271764, 0.0], [99.608942372519294, 7.55808138884692, 0.0], [99.608775892388195, 7.5578936906599, 0.0], [99.608606147940804, 7.55804874568396, 0.0], [99.608682859373701, 7.55811566416802, 0.0], [99.608640423261903, 7.55816626107061, 0.0], [99.608748145699707, 7.55826582271764, 0.0], [99.608748145699707, 7.55826582271764, 0.0]]]]}, "properties": {"Name": "ห้องแถวไม้ เลขที่ 275, 277, 279, 281, 283, 285 ถนนราชดำเนิน"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 59);
INSERT INTO "public"."Map" VALUES (1151, NULL, NULL, NULL, NULL, NULL, 'ตึกแถว เลขที่ 257, 259 หัวมุมซอยราชดำเนิน 1', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.608232488228694, 7.55781906020368, 0.0], [99.608282269052197, 7.55785170336664, 0.0], [99.608387543252803, 7.55773745229629, 0.0], [99.608342658903695, 7.55769093578907, 0.0], [99.608232488228694, 7.55781906020368, 0.0]]]]}, "properties": {"Name": "ตึกแถว เลขที่ 257, 259 หัวมุมซอยราชดำเนิน 1"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 60);
INSERT INTO "public"."Map" VALUES (1152, NULL, NULL, NULL, NULL, NULL, 'ห้องแถวไม้ เลขที่ 43, 45, 47, 49, 51 ซอยไทรงาม 2', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.607943983325498, 7.55800550583896, 0.0], [99.608050073605099, 7.55790104771749, 0.0], [99.607924397427695, 7.55776884290751, 0.0], [99.607828100096995, 7.55787003671268, 0.0], [99.607943983325498, 7.55800550583896, 0.0], [99.607943983325498, 7.55800550583896, 0.0]]]]}, "properties": {"Name": "ห้องแถวไม้ เลขที่ 43, 45, 47, 49, 51 ซอยไทรงาม 2"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 61);
INSERT INTO "public"."Map" VALUES (1153, NULL, NULL, NULL, NULL, NULL, 'ห้องแถวไม้ เลขที่ 92, 94 ชอยไทรงาม 2', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.607975766762095, 7.55765933841439, 0.0], [99.608045949562495, 7.5577246247403, 0.0], [99.608169993581697, 7.55760710935365, 0.0], [99.608104707255805, 7.55753855871144, 0.0], [99.607975766762095, 7.55765933841439, 0.0]]]]}, "properties": {"Name": "ห้องแถวไม้ เลขที่ 92, 94 ชอยไทรงาม 2"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 62);
INSERT INTO "public"."Map" VALUES (1154, NULL, NULL, NULL, NULL, NULL, 'ห้องแถวไม้ เลขที่ 80, 82, 84 ซอยไทรงาม 2', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.607875187669705, 7.55761675828246, 0.0], [99.608008539654506, 7.55747477199646, 0.0], [99.607923156009605, 7.55739994138627, 0.0], [99.607907806140801, 7.55741049442104, 0.0], [99.6078544386001, 7.55736273445004, 0.0], [99.607733658897104, 7.55747861767855, 0.0], [99.607875187669705, 7.55761675828246, 0.0]]]]}, "properties": {"Name": "ห้องแถวไม้ เลขที่ 80, 82, 84 ซอยไทรงาม 2"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 63);
INSERT INTO "public"."Map" VALUES (1155, NULL, NULL, NULL, NULL, NULL, 'ตึกแถวเลขที่ 233, 235, 237, 239 ถนนราชดำเนิน', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.608090085832302, 7.55749971553319, 0.0], [99.608225356550705, 7.55736540418157, 0.0], [99.608030325464199, 7.55716439593373, 0.0], [99.6078953343725, 7.55731167964092, 0.0], [99.608090085832302, 7.55749971553319, 0.0]]]]}, "properties": {"Name": "ตึกแถวเลขที่ 233, 235, 237, 239 ถนนราชดำเนิน"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 64);
INSERT INTO "public"."Map" VALUES (1156, NULL, NULL, NULL, NULL, NULL, 'ตึกแถว เลขที่ 132, 134, 136 ชอยราชดำเนิน 1', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.607625325397706, 7.55875347074338, 0.0], [99.607671025825795, 7.55871429894783, 0.0], [99.607635118346593, 7.55867675931043, 0.0], [99.607690611723598, 7.55863432319858, 0.0], [99.607581257127705, 7.55851843997008, 0.0], [99.607491488429503, 7.55859841571933, 0.0], [99.607625325397706, 7.55875347074338, 0.0]]]]}, "properties": {"Name": "ตึกแถว เลขที่ 132, 134, 136 ชอยราชดำเนิน 1"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 65);
INSERT INTO "public"."Map" VALUES (1157, NULL, NULL, NULL, NULL, NULL, 'องค์การบริหารส่วนจังหวัดตรัง', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.610969135078605, 7.55828978793215, 0.0], [99.611073593200103, 7.5583354883603, 0.0], [99.611089914781502, 7.55830774167178, 0.0], [99.611235176856695, 7.55836160289066, 0.0], [99.611215590958906, 7.55840077468621, 0.0], [99.611324945554898, 7.55844647511436, 0.0], [99.611341267136297, 7.5584138319514, 0.0], [99.6114751041045, 7.55847258964472, 0.0], [99.611455518206697, 7.55851502575657, 0.0], [99.611455518206697, 7.55851502575657, 0.0], [99.611569769276997, 7.55856072618471, 0.0], [99.611569769276997, 7.55856072618471, 0.0], [99.611651377184401, 7.55835507425807, 0.0], [99.611548551221105, 7.55832243109511, 0.0], [99.611524068848894, 7.55837955663029, 0.0], [99.611406553462203, 7.55832406325326, 0.0], [99.611429403676297, 7.55828489145771, 0.0], [99.611269452177794, 7.55821960513179, 0.0], [99.611249866280005, 7.55825877692734, 0.0], [99.6111241901027, 7.55820001923402, 0.0], [99.611148672474897, 7.55814289369884, 0.0], [99.611063800251202, 7.55810535406143, 0.0], [99.610969135078605, 7.55828978793215, 0.0]]]]}, "properties": {"Name": "องค์การบริหารส่วนจังหวัดตรัง"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 66);
INSERT INTO "public"."Map" VALUES (1158, NULL, NULL, NULL, NULL, NULL, 'ตึกแถว เลขที่ 15/1 ถนนรื่นรมย์', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.611673077604493, 7.5590162482052, 0.0], [99.611748156879301, 7.55888567555337, 0.0], [99.611620848543794, 7.55880733196227, 0.0], [99.611542504952695, 7.55892974382336, 0.0], [99.611673077604493, 7.5590162482052, 0.0]]]]}, "properties": {"Name": "ตึกแถว เลขที่ 15/1 ถนนรื่นรมย์"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 67);
INSERT INTO "public"."Map" VALUES (1159, NULL, NULL, NULL, NULL, NULL, 'สโมสรข้าราชการจังหวัดตรัง ถนนพระระราม 6', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.612977100297599, 7.55854254724183, 0.0], [99.613069199510207, 7.55853870977464, 0.0], [99.613069199510207, 7.55853870977464, 0.0], [99.613144030120296, 7.5584494886625, 0.0], [99.613144030120296, 7.5584494886625, 0.0], [99.613020271803506, 7.55833532401362, 0.0], [99.612892067787598, 7.55845622441598, 0.0], [99.612977100297599, 7.55854254724183, 0.0]]]]}, "properties": {"Name": "สโมสรข้าราชการจังหวัดตรัง ถนนพระระราม 6"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 68);
INSERT INTO "public"."Map" VALUES (1160, NULL, NULL, NULL, NULL, NULL, 'จวนผู้ว่าราชการจังหวัดตรัง ถนนอุดมลาภ', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.611833845182005, 7.56092342500108, 0.0], [99.611977475099096, 7.56094382697793, 0.0], [99.612023991606307, 7.56088180496831, 0.0], [99.612023991606307, 7.56088180496831, 0.0], [99.612026439843504, 7.5607912201911, 0.0], [99.611960337438504, 7.56076184134444, 0.0], [99.611846086368104, 7.56078061116314, 0.0], [99.611833845182005, 7.56092342500108, 0.0], [99.611833845182005, 7.56092342500108, 0.0]]]]}, "properties": {"Name": "จวนผู้ว่าราชการจังหวัดตรัง ถนนอุดมลาภ"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 69);
INSERT INTO "public"."Map" VALUES (1161, NULL, NULL, NULL, NULL, NULL, 'ตึกแถวปากซอยอุดมลาภ 3', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.611656756022995, 7.56145224424102, 0.0], [99.611752237274601, 7.56135594691029, 0.0], [99.611655123864793, 7.5612678103703, 0.0], [99.6115718837993, 7.56136573985918, 0.0], [99.611656756022995, 7.56145224424102, 0.0]]]]}, "properties": {"Name": "ตึกแถวปากซอยอุดมลาภ 3"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 70);
INSERT INTO "public"."Map" VALUES (1162, NULL, NULL, NULL, NULL, NULL, 'ตึกแถว เลขที่ 153, 155
ถนนพัทลุง (ถนนเพชรเกษม)', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.613523944944205, 7.56128494803086, 0.0], [99.613592495586502, 7.56119681149087, 0.0], [99.613533737893107, 7.56114621458828, 0.0], [99.613461922934604, 7.56122782249568, 0.0], [99.613523944944205, 7.56128494803086, 0.0]]]]}, "properties": {"Name": "ตึกแถว เลขที่ 153, 155\nถนนพัทลุง (ถนนเพชรเกษม)"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 71);
INSERT INTO "public"."Map" VALUES (1163, NULL, NULL, NULL, NULL, NULL, 'เลขที่ 191,193 ถนนห้วยยอด', NULL, NULL, NULL, NULL, NULL, '{"type": "Feature", "geometry": {"type": "MultiPolygon", "coordinates": [[[[99.604725586474302, 7.56638633017639, 0.0], [99.604902109964996, 7.56637289904123, 0.0], [99.604898272497806, 7.56627504362791, 0.0], [99.6047236677407, 7.56629423096385, 0.0], [99.604725586474302, 7.56638633017639, 0.0]]]]}, "properties": {"Name": "เลขที่ 191,193 ถนนห้วยยอด"}}', NULL, NULL, '0001-01-01 00:00:00', '0001-01-01 00:00:00', 72);

-- ----------------------------
-- Table structure for Owner
-- ----------------------------
DROP TABLE IF EXISTS "public"."Owner";
CREATE TABLE "public"."Owner" (
  "id" int4 NOT NULL DEFAULT nextval('"Owner_id_seq"'::regclass),
  "title_owner" text COLLATE "pg_catalog"."default" NOT NULL,
  "first_name" text COLLATE "pg_catalog"."default" NOT NULL,
  "last_name" text COLLATE "pg_catalog"."default" NOT NULL,
  "phone" text COLLATE "pg_catalog"."default",
  "no_id" text COLLATE "pg_catalog"."default",
  "road" text COLLATE "pg_catalog"."default",
  "subdistrict" text COLLATE "pg_catalog"."default",
  "district" text COLLATE "pg_catalog"."default",
  "province" text COLLATE "pg_catalog"."default",
  "postcode" int4,
  "org_name" text COLLATE "pg_catalog"."default",
  "org_address" text COLLATE "pg_catalog"."default",
  "user_id" int4,
  "owner_type" text COLLATE "pg_catalog"."default",
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "number_no" text COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of Owner
-- ----------------------------
INSERT INTO "public"."Owner" VALUES (17, 'นางสาว', 'เผยแพร่', 'ด้านแผนที่', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'บุคคลธรรมดา', '2026-03-30 16:56:37.804', NULL);

-- ----------------------------
-- Table structure for PlanProject
-- ----------------------------
DROP TABLE IF EXISTS "public"."PlanProject";
CREATE TABLE "public"."PlanProject" (
  "id" int4 NOT NULL DEFAULT nextval('"PlanProject_id_seq"'::regclass),
  "code" text COLLATE "pg_catalog"."default" NOT NULL,
  "name" text COLLATE "pg_catalog"."default" NOT NULL,
  "category" text COLLATE "pg_catalog"."default",
  "startDate" timestamp(3),
  "endDate" timestamp(3),
  "supervisor" text COLLATE "pg_catalog"."default",
  "budget" float8,
  "fiscalYearId" int4,
  "status" text COLLATE "pg_catalog"."default",
  "documentCount" int4,
  "details" text COLLATE "pg_catalog"."default",
  "user_id" int4,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Records of PlanProject
-- ----------------------------
INSERT INTO "public"."PlanProject" VALUES (12, 'ตง.ถ.2-0001', 'ถนนราชดำเนิน', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.639', '2026-03-29 15:52:56.639');
INSERT INTO "public"."PlanProject" VALUES (13, 'ตง.ถ.2-0002', 'ถนนพระราม 6', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.656', '2026-03-29 15:52:56.656');
INSERT INTO "public"."PlanProject" VALUES (14, 'ตง.ถ.2-0003', 'ถนนวิเศษกุล', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.657', '2026-03-29 15:52:56.657');
INSERT INTO "public"."PlanProject" VALUES (15, 'ตง.ถ.2-0004', 'ถนนกันตัง', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.658', '2026-03-29 15:52:56.658');
INSERT INTO "public"."PlanProject" VALUES (16, 'ตง.ถ.2-0005', 'ถนนห้วยยอด', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.658', '2026-03-29 15:52:56.658');
INSERT INTO "public"."PlanProject" VALUES (17, 'ตง.ถ.2-0006', 'ถนนพัทลุง(ตอนที่ 1)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.659', '2026-03-29 15:52:56.659');
INSERT INTO "public"."PlanProject" VALUES (18, 'ตง.ถ.2-0007', 'ถนนพัทลุง(ตอนที่ 2)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.659', '2026-03-29 15:52:56.659');
INSERT INTO "public"."PlanProject" VALUES (19, 'ตง.ถ.2-0008', 'ถนนรัษฎา', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.66', '2026-03-29 15:52:56.66');
INSERT INTO "public"."PlanProject" VALUES (20, 'ตง.ถ.2-0009', 'ถนนเจิมปัญญา', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.661', '2026-03-29 15:52:56.661');
INSERT INTO "public"."PlanProject" VALUES (21, 'ตง.ถ.2-0010', 'ถนนบางรัก', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.661', '2026-03-29 15:52:56.661');
INSERT INTO "public"."PlanProject" VALUES (22, 'ตง.ถ.2-0011', 'ถนนจริงจิตร', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.662', '2026-03-29 15:52:56.662');
INSERT INTO "public"."PlanProject" VALUES (23, 'ตง.ถ.2-0012', 'ถนนรักษ์จันทร์(ตอนที่ 1)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.662', '2026-03-29 15:52:56.662');
INSERT INTO "public"."PlanProject" VALUES (24, 'ตง.ถ.2-0013', 'ถนนรักษ์จันทร์(ตอนที่ 2)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.663', '2026-03-29 15:52:56.663');
INSERT INTO "public"."PlanProject" VALUES (25, 'ตง.ถ.2-0014', 'ถนนอุดมลาภ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.664', '2026-03-29 15:52:56.664');
INSERT INTO "public"."PlanProject" VALUES (26, 'ตง.ถ.2-0015', 'ถนนควนคีรี', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.665', '2026-03-29 15:52:56.665');
INSERT INTO "public"."PlanProject" VALUES (27, 'ตง.ถ.2-0016', 'ถนนเพลินพิทักษ์', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.666', '2026-03-29 15:52:56.666');
INSERT INTO "public"."PlanProject" VALUES (28, 'ตง.ถ.2-0017', 'ถนนเวียนกะพัง(ตอนที่1)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.666', '2026-03-29 15:52:56.666');
INSERT INTO "public"."PlanProject" VALUES (29, 'ตง.ถ.2-0018', 'ถนนเวียนกะพัง(ตอนที่2)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.667', '2026-03-29 15:52:56.667');
INSERT INTO "public"."PlanProject" VALUES (30, 'ตง.ถ.2-0019', 'ถนนสังขวิทย์', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.667', '2026-03-29 15:52:56.667');
INSERT INTO "public"."PlanProject" VALUES (31, 'ตง.ถ.2-0020', 'ถนนท่ากลาง', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.668', '2026-03-29 15:52:56.668');
INSERT INTO "public"."PlanProject" VALUES (32, 'ตง.ถ.2-0021', 'ถนนรื่นรมย์', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.669', '2026-03-29 15:52:56.669');
INSERT INTO "public"."PlanProject" VALUES (33, 'ตง.ถ.2-0022', 'ถนนวังตอ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.67', '2026-03-29 15:52:56.67');
INSERT INTO "public"."PlanProject" VALUES (34, 'ตง.ถ.2-0023', 'ถนนหนองยวน', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.671', '2026-03-29 15:52:56.671');
INSERT INTO "public"."PlanProject" VALUES (35, 'ตง.ถ.2-0024', 'ถนนสายน้ำผุดใต้(ผ่านสวนสมเด็จ)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.671', '2026-03-29 15:52:56.671');
INSERT INTO "public"."PlanProject" VALUES (36, 'ตง.ถ.2-0027', 'ถนนสายทุ่งควน (ตอนที่1)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.673', '2026-03-29 15:52:56.673');
INSERT INTO "public"."PlanProject" VALUES (37, 'ตง.ถ.2-0028', 'ถนนสายทุ่งควน (ตอนที่2)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.674', '2026-03-29 15:52:56.674');
INSERT INTO "public"."PlanProject" VALUES (38, 'ตง.ถ.2-0029', 'ถนนสายควนวิเศษ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.675', '2026-03-29 15:52:56.675');
INSERT INTO "public"."PlanProject" VALUES (39, 'ตง.ถ.2-0030', 'ถนนสายควนหาญ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.676', '2026-03-29 15:52:56.676');
INSERT INTO "public"."PlanProject" VALUES (40, 'ตง.ถ.2-0031', 'ถนนสายราษฎร์อุทิศ (รอบรพ.ตรัง', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.676', '2026-03-29 15:52:56.676');
INSERT INTO "public"."PlanProject" VALUES (41, 'ตง.ถ.2-0032', 'ถนนสายราษฎร์อุทิศ 1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.677', '2026-03-29 15:52:56.677');
INSERT INTO "public"."PlanProject" VALUES (42, 'ตง.ถ.2-0033', 'ถนนสายราษฎร์อุทิศ 2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.677', '2026-03-29 15:52:56.677');
INSERT INTO "public"."PlanProject" VALUES (43, 'ตง.ถ.2-0034', 'ถนนสายราษฎร์อุทิศ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.678', '2026-03-29 15:52:56.678');
INSERT INTO "public"."PlanProject" VALUES (44, 'ตง.ถ.2-0035', 'ถนนสายราษฎร์อุทิศ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.678', '2026-03-29 15:52:56.678');
INSERT INTO "public"."PlanProject" VALUES (45, 'ตง.ถ.2-0036', 'ถนนสายโคกขัน', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.679', '2026-03-29 15:52:56.679');
INSERT INTO "public"."PlanProject" VALUES (46, 'ตง.ถ.2-0037', 'ถนนขนานทางรถไฟ(ใต้)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.68', '2026-03-29 15:52:56.68');
INSERT INTO "public"."PlanProject" VALUES (47, 'ตง.ถ.2-0039', 'ถนนสายบ้านโพธิ์', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.681', '2026-03-29 15:52:56.681');
INSERT INTO "public"."PlanProject" VALUES (48, 'ตง.ถ.2-0040', 'ถนนกันตังซอย 1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.682', '2026-03-29 15:52:56.682');
INSERT INTO "public"."PlanProject" VALUES (49, 'ตง.ถ.2-0041', 'ถนนกันตังซอย 2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.682', '2026-03-29 15:52:56.682');
INSERT INTO "public"."PlanProject" VALUES (50, 'ตง.ถ.2-0042', 'ถนนกันตังซอย 3', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.683', '2026-03-29 15:52:56.683');
INSERT INTO "public"."PlanProject" VALUES (51, 'ตง.ถ.2-0043', 'ถนนกันตังซอย 6', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.683', '2026-03-29 15:52:56.683');
INSERT INTO "public"."PlanProject" VALUES (52, 'ตง.ถ.2-0044', 'ถนนกันตังซอย 7', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.684', '2026-03-29 15:52:56.684');
INSERT INTO "public"."PlanProject" VALUES (53, 'ตง.ถ.2-0045', 'ถนนกันตังซอย 8', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.684', '2026-03-29 15:52:56.684');
INSERT INTO "public"."PlanProject" VALUES (54, 'ตง.ถ.2-0046', 'ถนนกันตังซอย 9', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.685', '2026-03-29 15:52:56.685');
INSERT INTO "public"."PlanProject" VALUES (55, 'ตง.ถ.2-0047', 'ถนนกันตังซอย 10 (สุสาน)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.685', '2026-03-29 15:52:56.685');
INSERT INTO "public"."PlanProject" VALUES (56, 'ตง.ถ.2-0048', 'ถนนกันตังซอย 11', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.686', '2026-03-29 15:52:56.686');
INSERT INTO "public"."PlanProject" VALUES (57, 'ตง.ถ.2-0049', 'ถนนกันตังซอย 12 (ซอยสินไชย)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.686', '2026-03-29 15:52:56.686');
INSERT INTO "public"."PlanProject" VALUES (58, 'ตง.ถ.2-0050', 'ถนนกันตังซอย 13', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.687', '2026-03-29 15:52:56.687');
INSERT INTO "public"."PlanProject" VALUES (59, 'ตง.ถ.2-0051', 'ถนนกันตังซอย 14', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.688', '2026-03-29 15:52:56.688');
INSERT INTO "public"."PlanProject" VALUES (60, 'ตง.ถ.2-0052', 'ถนนกันตังซอย 15', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.688', '2026-03-29 15:52:56.688');
INSERT INTO "public"."PlanProject" VALUES (61, 'ตง.ถ.2-0053', 'ถนนกันตังซอย 16', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.688', '2026-03-29 15:52:56.688');
INSERT INTO "public"."PlanProject" VALUES (62, 'ตง.ถ.2-0054', 'ถนนกันตังซอย 18', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.689', '2026-03-29 15:52:56.689');
INSERT INTO "public"."PlanProject" VALUES (63, 'ตง.ถ.2-0055', 'ถนนกันตังซอย 20', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.689', '2026-03-29 15:52:56.689');
INSERT INTO "public"."PlanProject" VALUES (64, 'ตง.ถ.2-0056', 'ถนนกันตังซอย 22 (สวัสดิ์อุทิศ)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.69', '2026-03-29 15:52:56.69');
INSERT INTO "public"."PlanProject" VALUES (65, 'ตง.ถ.2-0057', 'ถนนกันตังซอย 24', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.69', '2026-03-29 15:52:56.69');
INSERT INTO "public"."PlanProject" VALUES (66, 'ตง.ถ.2-0058', 'ถนนกันตังซอย 26', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.691', '2026-03-29 15:52:56.691');
INSERT INTO "public"."PlanProject" VALUES (67, 'ตง.ถ.2-0059', 'ถนนห้วยยอด ซอย 2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.691', '2026-03-29 15:52:56.691');
INSERT INTO "public"."PlanProject" VALUES (68, 'ตง.ถ.2-0060', 'ถนนห้วยยอด ซอย 3', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.692', '2026-03-29 15:52:56.692');
INSERT INTO "public"."PlanProject" VALUES (69, 'ตง.ถ.2-0061', 'ถนนห้วยยอด ซอย 4', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.692', '2026-03-29 15:52:56.692');
INSERT INTO "public"."PlanProject" VALUES (70, 'ตง.ถ.2-0062', 'ถนนห้วยยอด ซอย 5', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.693', '2026-03-29 15:52:56.693');
INSERT INTO "public"."PlanProject" VALUES (71, 'ตง.ถ.2-0063', 'ถนนห้วยยอด ซอย 6', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.693', '2026-03-29 15:52:56.693');
INSERT INTO "public"."PlanProject" VALUES (72, 'ตง.ถ.2-0064', 'ถนนห้วยยอด ซอย 8 (วังชา)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.694', '2026-03-29 15:52:56.694');
INSERT INTO "public"."PlanProject" VALUES (73, 'ตง.ถ.2-0065', 'ถนนห้วยยอด ซอย 8/1 (ซอยยุพา)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.695', '2026-03-29 15:52:56.695');
INSERT INTO "public"."PlanProject" VALUES (75, 'ตง.ถ.2-0067', 'ถนนห้วยยอด ซอย 10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.696', '2026-03-29 15:52:56.696');
INSERT INTO "public"."PlanProject" VALUES (76, 'ตง.ถ.2-0068', 'ถนนห้วยยอด ซอย 11', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.697', '2026-03-29 15:52:56.697');
INSERT INTO "public"."PlanProject" VALUES (77, 'ตง.ถ.2-0069', 'ถนนห้วยยอด ซอย 12', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.697', '2026-03-29 15:52:56.697');
INSERT INTO "public"."PlanProject" VALUES (78, 'ตง.ถ.2-0070', 'ถนนห้วยยอด ซอย 13', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.698', '2026-03-29 15:52:56.698');
INSERT INTO "public"."PlanProject" VALUES (79, 'ตง.ถ.2-0071', 'ถนนห้วยยอด ซอย 14', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.699', '2026-03-29 15:52:56.699');
INSERT INTO "public"."PlanProject" VALUES (80, 'ตง.ถ.2-0072', 'ถนนห้วยยอด ซอย 16', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.7', '2026-03-29 15:52:56.7');
INSERT INTO "public"."PlanProject" VALUES (81, 'ตง.ถ.2-0073', 'ถนนห้วยยอด ซอย 17', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.7', '2026-03-29 15:52:56.7');
INSERT INTO "public"."PlanProject" VALUES (82, 'ตง.ถ.2-0074', 'ถนนห้วยยอด ซอย 18 (สินไชย)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.701', '2026-03-29 15:52:56.701');
INSERT INTO "public"."PlanProject" VALUES (83, 'ตง.ถ.2-0075', 'ถนนห้วยยอด ซอย 19', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.701', '2026-03-29 15:52:56.701');
INSERT INTO "public"."PlanProject" VALUES (84, 'ตง.ถ.2-0076', 'ถนนห้วยยอด ซอย 21', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.702', '2026-03-29 15:52:56.702');
INSERT INTO "public"."PlanProject" VALUES (85, 'ตง.ถ.2-0077', 'ถนนห้วยยอด ซอย 22', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.702', '2026-03-29 15:52:56.702');
INSERT INTO "public"."PlanProject" VALUES (86, 'ตง.ถ.2-0078', 'ถนนห้วยยอด ซอย 23', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.703', '2026-03-29 15:52:56.703');
INSERT INTO "public"."PlanProject" VALUES (87, 'ตง.ถ.2-0079', 'ถนนห้วยยอด ซอย 24', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.704', '2026-03-29 15:52:56.704');
INSERT INTO "public"."PlanProject" VALUES (88, 'ตง.ถ.2-0080', 'ถนนห้วยยอด ซอย 26', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.704', '2026-03-29 15:52:56.704');
INSERT INTO "public"."PlanProject" VALUES (89, 'ตง.ถ.2-0081', 'ถนนห้วยยอด ซอย 30', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.705', '2026-03-29 15:52:56.705');
INSERT INTO "public"."PlanProject" VALUES (90, 'ตง.ถ.2-0082', 'ถนนห้วยยอด ซอย 32', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.705', '2026-03-29 15:52:56.705');
INSERT INTO "public"."PlanProject" VALUES (91, 'ตง.ถ.2-0083', 'ถนนห้วยยอด ซอยบ่อนไก่', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.705', '2026-03-29 15:52:56.705');
INSERT INTO "public"."PlanProject" VALUES (92, 'ตง.ถ.2-0084', 'ถนนห้วยยอด ซอยสิงห์ทอง', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.706', '2026-03-29 15:52:56.706');
INSERT INTO "public"."PlanProject" VALUES (93, 'ตง.ถ.2-0085', 'ถนนพัทลุง ซอย 1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.706', '2026-03-29 15:52:56.706');
INSERT INTO "public"."PlanProject" VALUES (94, 'ตง.ถ.2-0086', 'ถนนพัทลุง ซอย 3', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.707', '2026-03-29 15:52:56.707');
INSERT INTO "public"."PlanProject" VALUES (95, 'ตง.ถ.2-0087', 'ถนนประชาอุทิศ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.708', '2026-03-29 15:52:56.708');
INSERT INTO "public"."PlanProject" VALUES (96, 'ตง.ถ.2-0088', 'ถนนพัทลุง ซอย 4', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.708', '2026-03-29 15:52:56.708');
INSERT INTO "public"."PlanProject" VALUES (97, 'ตง.ถ.2-0089', 'ถนนพัทลุง ซอย 5', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.709', '2026-03-29 15:52:56.709');
INSERT INTO "public"."PlanProject" VALUES (98, 'ตง.ถ.2-0090', 'ถนนพัทลุง ซอย 6', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.709', '2026-03-29 15:52:56.709');
INSERT INTO "public"."PlanProject" VALUES (99, 'ตง.ถ.2-0091', 'ถนนพัทลุง ซอย 7', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.71', '2026-03-29 15:52:56.71');
INSERT INTO "public"."PlanProject" VALUES (100, 'ตง.ถ.2-0092', 'ถนนพัทลุง ซอย 9', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.71', '2026-03-29 15:52:56.71');
INSERT INTO "public"."PlanProject" VALUES (101, 'ตง.ถ.2-0093', 'ถนนพัทลุง ซอย 11', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.711', '2026-03-29 15:52:56.711');
INSERT INTO "public"."PlanProject" VALUES (102, 'ตง.ถ.2-0094', 'ถนนพัทลุง ซอยข้างร้านAM.PM', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.712', '2026-03-29 15:52:56.712');
INSERT INTO "public"."PlanProject" VALUES (103, 'ตง.ถ.2-0095', 'ถนนบางรัก ซอย 2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.712', '2026-03-29 15:52:56.712');
INSERT INTO "public"."PlanProject" VALUES (104, 'ตง.ถ.2-0096', 'ถนนบางรัก ซอย 3', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.713', '2026-03-29 15:52:56.713');
INSERT INTO "public"."PlanProject" VALUES (105, 'ตง.ถ.2-0097', 'ถนนบางรัก ซอย 4', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.714', '2026-03-29 15:52:56.714');
INSERT INTO "public"."PlanProject" VALUES (106, 'ตง.ถ.2-0098', 'ถนนบางรัก ซอย 5', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.715', '2026-03-29 15:52:56.715');
INSERT INTO "public"."PlanProject" VALUES (107, 'ตง.ถ.2-0099', 'ถนนบางรัก ซอย 6', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.715', '2026-03-29 15:52:56.715');
INSERT INTO "public"."PlanProject" VALUES (108, 'ตง.ถ.2-0100', 'ถนนบางรัก ซอย ข้างบ้านเลขที่38', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.716', '2026-03-29 15:52:56.716');
INSERT INTO "public"."PlanProject" VALUES (109, 'ตง.ถ.2-0101', 'ถนนจริงจิตร ซอย 2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.716', '2026-03-29 15:52:56.716');
INSERT INTO "public"."PlanProject" VALUES (110, 'ตง.ถ.2-0102', 'ถนนจริงจิตร ซอย 4', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.717', '2026-03-29 15:52:56.717');
INSERT INTO "public"."PlanProject" VALUES (111, 'ตง.ถ.2-0103', 'ถนนจริงจิตร ซอยพล.ต.ต.สมพร', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.717', '2026-03-29 15:52:56.717');
INSERT INTO "public"."PlanProject" VALUES (112, 'ตง.ถ.2-0104', 'ถนนรักษ์จันทน์ ซอย 1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.718', '2026-03-29 15:52:56.718');
INSERT INTO "public"."PlanProject" VALUES (113, 'ตง.ถ.2-0105', 'ถนนรักษ์จันทน์ ซอย 2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.718', '2026-03-29 15:52:56.718');
INSERT INTO "public"."PlanProject" VALUES (114, 'ตง.ถ.2-0106', 'ถนนรักษ์จันทน์ ซอย 3', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.719', '2026-03-29 15:52:56.719');
INSERT INTO "public"."PlanProject" VALUES (115, 'ตง.ถ.2-0107', 'ถนนรักษ์จันทน์ ซอย 5', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.719', '2026-03-29 15:52:56.719');
INSERT INTO "public"."PlanProject" VALUES (116, 'ตง.ถ.2-0108', 'ถนนรักษ์จันทน์ ซอย 7 (ซอยผสมเทียม)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.72', '2026-03-29 15:52:56.72');
INSERT INTO "public"."PlanProject" VALUES (117, 'ตง.ถ.2-0109', 'ถนนอุดมลาภ ซอย 1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.721', '2026-03-29 15:52:56.721');
INSERT INTO "public"."PlanProject" VALUES (118, 'ตง.ถ.2-0110', 'ถนนอุดมลาภ ซอย 3', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.721', '2026-03-29 15:52:56.721');
INSERT INTO "public"."PlanProject" VALUES (119, 'ตง.ถ.2-0111', 'ถนนอุดมลาภ ซอย 5', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.722', '2026-03-29 15:52:56.722');
INSERT INTO "public"."PlanProject" VALUES (120, 'ตง.ถ.2-0112', 'ถนนอุดมลาภ ซอย 7', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.722', '2026-03-29 15:52:56.722');
INSERT INTO "public"."PlanProject" VALUES (121, 'ตง.ถ.2-0113', 'ถนนอุดมลาภ ซอย 9', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.723', '2026-03-29 15:52:56.723');
INSERT INTO "public"."PlanProject" VALUES (122, 'ตง.ถ.2-0114', 'ถนนควนคีรี ซอย 1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.723', '2026-03-29 15:52:56.723');
INSERT INTO "public"."PlanProject" VALUES (123, 'ตง.ถ.2-0115', 'ถนนควนคีรี ซอย 3', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.723', '2026-03-29 15:52:56.723');
INSERT INTO "public"."PlanProject" VALUES (124, 'ตง.ถ.2-0116', 'ถนนควนคีรี ซอย 5', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.724', '2026-03-29 15:52:56.724');
INSERT INTO "public"."PlanProject" VALUES (125, 'ตง.ถ.2-0117', 'ถนนแยกซอยควนคีรี', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.724', '2026-03-29 15:52:56.724');
INSERT INTO "public"."PlanProject" VALUES (126, 'ตง.ถ.2-0118', 'ถนนเพลินพิทักษ์ ซอย 1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.725', '2026-03-29 15:52:56.725');
INSERT INTO "public"."PlanProject" VALUES (127, 'ตง.ถ.2-0119', 'ถนนเพลินพิทักษ์ ซอย 2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.726', '2026-03-29 15:52:56.726');
INSERT INTO "public"."PlanProject" VALUES (128, 'ตง.ถ.2-0120', 'ถนนเพลินพิทักษ์ ซอย 4', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.727', '2026-03-29 15:52:56.727');
INSERT INTO "public"."PlanProject" VALUES (129, 'ตง.ถ.2-0121', 'ถนนเพลินพิทักษ์ ซอย 6 (โกดำ)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.728', '2026-03-29 15:52:56.728');
INSERT INTO "public"."PlanProject" VALUES (130, 'ตง.ถ.2-0122', 'ถนนเพลินพิทักษ์ ซอย 8', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.728', '2026-03-29 15:52:56.728');
INSERT INTO "public"."PlanProject" VALUES (131, 'ตง.ถ.2-0123', 'ถนนเพลินพิทักษ์ ซอย 10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.729', '2026-03-29 15:52:56.729');
INSERT INTO "public"."PlanProject" VALUES (132, 'ตง.ถ.2-0124', 'ถนนเพลินพิทักษ์ ซอย 14', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.729', '2026-03-29 15:52:56.729');
INSERT INTO "public"."PlanProject" VALUES (133, 'ตง.ถ.2-0125', 'ถนนเพลินพิทักษ์ ซอยแยก ซอย 14', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.73', '2026-03-29 15:52:56.73');
INSERT INTO "public"."PlanProject" VALUES (134, 'ตง.ถ.2-0126', 'ถนนเวียนกะพัง ซอย 1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.73', '2026-03-29 15:52:56.73');
INSERT INTO "public"."PlanProject" VALUES (135, 'ตง.ถ.2-0127', 'ถนนเวียนกะพัง ซอย 2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.731', '2026-03-29 15:52:56.731');
INSERT INTO "public"."PlanProject" VALUES (136, 'ตง.ถ.2-0128', 'ถนนเวียนกะพัง ซอย 4', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.732', '2026-03-29 15:52:56.732');
INSERT INTO "public"."PlanProject" VALUES (137, 'ตง.ถ.2-0129', 'ถนนเวียนกะพัง ซอย 6', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.733', '2026-03-29 15:52:56.733');
INSERT INTO "public"."PlanProject" VALUES (138, 'ตง.ถ.2-0130', 'ถนนเวียนกะพัง ซอย 8', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.734', '2026-03-29 15:52:56.734');
INSERT INTO "public"."PlanProject" VALUES (139, 'ตง.ถ.2-0131', 'ถนนเวียนกะพัง ซอย 10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.735', '2026-03-29 15:52:56.735');
INSERT INTO "public"."PlanProject" VALUES (140, 'ตง.ถ.2-0132', 'ถนนเวียนกะพัง ซอย 12', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.735', '2026-03-29 15:52:56.735');
INSERT INTO "public"."PlanProject" VALUES (141, 'ตง.ถ.2-0133', 'ถนนสังขวิทย์ ซอย 1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.736', '2026-03-29 15:52:56.736');
INSERT INTO "public"."PlanProject" VALUES (142, 'ตง.ถ.2-0134', 'ถนนสังขวิทย์ ซอย 2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.737', '2026-03-29 15:52:56.737');
INSERT INTO "public"."PlanProject" VALUES (143, 'ตง.ถ.2-0135', 'ถนนสังขวิทย์ ซอย 3', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.737', '2026-03-29 15:52:56.737');
INSERT INTO "public"."PlanProject" VALUES (144, 'ตง.ถ.2-0136', 'ถนนสังขวิทย์ ซอย 4', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.738', '2026-03-29 15:52:56.738');
INSERT INTO "public"."PlanProject" VALUES (145, 'ตง.ถ.2-0137', 'ถนนท่ากลาง ซอย 2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.738', '2026-03-29 15:52:56.738');
INSERT INTO "public"."PlanProject" VALUES (146, 'ตง.ถ.2-0138', 'ถนนท่ากลาง ซอย 6', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.739', '2026-03-29 15:52:56.739');
INSERT INTO "public"."PlanProject" VALUES (147, 'ตง.ถ.2-0139', 'ถนนท่ากลาง ซอย 8', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.739', '2026-03-29 15:52:56.739');
INSERT INTO "public"."PlanProject" VALUES (148, 'ตง.ถ.2-0140', 'ถนนวังตอ ซอย 1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.74', '2026-03-29 15:52:56.74');
INSERT INTO "public"."PlanProject" VALUES (149, 'ตง.ถ.2-0141', 'ถนนวังตอ ซอย 1-1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.74', '2026-03-29 15:52:56.74');
INSERT INTO "public"."PlanProject" VALUES (150, 'ตง.ถ.2-0142', 'ถนนวังตอ ซอย 2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.74', '2026-03-29 15:52:56.74');
INSERT INTO "public"."PlanProject" VALUES (151, 'ตง.ถ.2-0143', 'ถนนวังตอ ซอย 2/2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.741', '2026-03-29 15:52:56.741');
INSERT INTO "public"."PlanProject" VALUES (152, 'ตง.ถ.2-0144', 'ถนนวังตอ ซอย 3', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.741', '2026-03-29 15:52:56.741');
INSERT INTO "public"."PlanProject" VALUES (153, 'ตง.ถ.2-0145', 'ถนนวังตอ ซอย 4', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.742', '2026-03-29 15:52:56.742');
INSERT INTO "public"."PlanProject" VALUES (154, 'ตง.ถ.2-0146', 'ถนนวังตอ ซอย 4/1 (แยกวังตอซอย4)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.743', '2026-03-29 15:52:56.743');
INSERT INTO "public"."PlanProject" VALUES (155, 'ตง.ถ.2-0147', 'ถนนรัษฎา ซอย 1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.743', '2026-03-29 15:52:56.743');
INSERT INTO "public"."PlanProject" VALUES (156, 'ตง.ถ.2-0148', 'ถนนรัษฎา ซอย 2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.743', '2026-03-29 15:52:56.743');
INSERT INTO "public"."PlanProject" VALUES (157, 'ตง.ถ.2-0149', 'ถนนรัษฎา ซอย 3', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.744', '2026-03-29 15:52:56.744');
INSERT INTO "public"."PlanProject" VALUES (158, 'ตง.ถ.2-0150', 'ถนนรัษฎา ซอย 4', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.744', '2026-03-29 15:52:56.744');
INSERT INTO "public"."PlanProject" VALUES (159, 'ตง.ถ.2-0151', 'ถนนรัษฎา ซอย 5', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.745', '2026-03-29 15:52:56.745');
INSERT INTO "public"."PlanProject" VALUES (160, 'ตง.ถ.2-0152', 'ถนนรัษฎา ซอย 6', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.745', '2026-03-29 15:52:56.745');
INSERT INTO "public"."PlanProject" VALUES (74, 'ตง.ถ.2-0066', 'ถนนห้วยยอด ซอย 9', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-03-29 15:52:56.695', '2026-03-30 12:21:06.194');

-- ----------------------------
-- Table structure for RiskZone
-- ----------------------------
DROP TABLE IF EXISTS "public"."RiskZone";
CREATE TABLE "public"."RiskZone" (
  "id" int4 NOT NULL DEFAULT nextval('"RiskZone_id_seq"'::regclass),
  "zoneType" text COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "fiscalYearId" int4,
  "status" text COLLATE "pg_catalog"."default",
  "owner_id" int4,
  "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL,
  "zone_code" text COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of RiskZone
-- ----------------------------
INSERT INTO "public"."RiskZone" VALUES (184, 'แสดงรายการ', NULL, NULL, NULL, NULL, '2026-03-30 08:14:09.303', '2026-03-30 08:14:09.303', '2026-03-30 12:06:12.983', 'test55');

-- ----------------------------
-- Table structure for Uploads
-- ----------------------------
DROP TABLE IF EXISTS "public"."Uploads";
CREATE TABLE "public"."Uploads" (
  "id" int4 NOT NULL DEFAULT nextval('"Uploads_id_seq"'::regclass),
  "namefile" text COLLATE "pg_catalog"."default" NOT NULL,
  "url" text COLLATE "pg_catalog"."default",
  "fileType" text COLLATE "pg_catalog"."default",
  "size" int4,
  "token" text COLLATE "pg_catalog"."default" NOT NULL,
  "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "uploadedBy" int4,
  "buildingControlId" int4,
  "riskZoneId" int4,
  "zoningPlanId" int4,
  "mapId" int4
)
;

-- ----------------------------
-- Records of Uploads
-- ----------------------------
INSERT INTO "public"."Uploads" VALUES (148, 'ตง.ถ.2-0012 ถนนรักษ์จันทร์(ตอนที่ 1)1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0012 ถนนรักษ์จันทร์(ตอนที่ 1)1.jpg', 'image', NULL, '70fec74f-dbfd-4999-8eee-df45e31f379a', '2026-03-30 19:20:00.619', NULL, NULL, NULL, NULL, 882);
INSERT INTO "public"."Uploads" VALUES (149, 'ตง.ถ.2-0012 ถนนรักษ์จันทร์(ตอนที่ 1)2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0012 ถนนรักษ์จันทร์(ตอนที่ 1)2.jpg', 'image', NULL, 'a7265459-a332-481c-b789-b948875b02ae', '2026-03-30 19:20:00.62', NULL, NULL, NULL, NULL, 882);
INSERT INTO "public"."Uploads" VALUES (327, 'ตง.ถ.2-0041 ถนนกันตังซอย 22.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0041 ถนนกันตังซอย 22.jpg', 'image', NULL, '7f7412be-6f36-42ff-83d4-31306ff677d2', '2026-03-30 19:20:00.731', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (328, 'ตง.ถ.2-0041 ถนนกันตังซอย 23.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0041 ถนนกันตังซอย 23.jpg', 'image', NULL, 'e862c4e2-734d-4ff2-a697-4b4eea59c5a3', '2026-03-30 19:20:00.732', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (329, 'ตง.ถ.2-0041 ถนนกันตังซอย 24.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0041 ถนนกันตังซอย 24.jpg', 'image', NULL, 'b9f0cefb-3e58-4501-b5cf-6f11ffec3e71', '2026-03-30 19:20:00.733', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (330, 'ตง.ถ.2-0041 ถนนกันตังซอย 25.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0041 ถนนกันตังซอย 25.jpg', 'image', NULL, '8367b325-e514-48dd-83ec-210064f532b9', '2026-03-30 19:20:00.733', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (331, 'ตง.ถ.2-0041 ถนนกันตังซอย 26.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0041 ถนนกันตังซอย 26.jpg', 'image', NULL, '8eb4108d-8e74-45d9-b512-d53a0b841647', '2026-03-30 19:20:00.733', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (332, 'ตง.ถ.2-0041 ถนนกันตังซอย 27.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0041 ถนนกันตังซอย 27.jpg', 'image', NULL, '2efb9332-b5d7-4ce9-a353-4621e078c0b6', '2026-03-30 19:20:00.734', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (150, 'ตง.ถ.2-0012 ถนนรักษ์จันทร์(ตอนที่ 1)3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0012 ถนนรักษ์จันทร์(ตอนที่ 1)3.jpg', 'image', NULL, '26888fd8-ab79-4ffd-90d1-8169b979e7c4', '2026-03-30 19:20:00.62', NULL, NULL, NULL, NULL, 882);
INSERT INTO "public"."Uploads" VALUES (151, 'ตง.ถ.2-0012 ถนนรักษ์จันทร์(ตอนที่ 1)4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0012 ถนนรักษ์จันทร์(ตอนที่ 1)4.jpg', 'image', NULL, 'f97a79ad-7acf-4716-a8ed-26fd85731191', '2026-03-30 19:20:00.62', NULL, NULL, NULL, NULL, 882);
INSERT INTO "public"."Uploads" VALUES (293, 'ตง.ถ.2-0035 ถนนสายราษฎร์อุทิศ 41.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0035 ถนนสายราษฎร์อุทิศ 41.jpg', 'image', NULL, '12568541-e07f-4f87-93c4-d7c3f788f241', '2026-03-30 19:20:00.706', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (294, 'ตง.ถ.2-0035 ถนนสายราษฎร์อุทิศ 42.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0035 ถนนสายราษฎร์อุทิศ 42.jpg', 'image', NULL, '64812f2a-d38f-4f05-82ed-114bb799b7f2', '2026-03-30 19:20:00.707', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (295, 'ตง.ถ.2-0035 ถนนสายราษฎร์อุทิศ 43.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0035 ถนนสายราษฎร์อุทิศ 43.jpg', 'image', NULL, '836d4006-9d56-4ffe-bc30-cbf18d579ec0', '2026-03-30 19:20:00.708', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (296, 'ตง.ถ.2-0035 ถนนสายราษฎร์อุทิศ 44.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0035 ถนนสายราษฎร์อุทิศ 44.jpg', 'image', NULL, 'b3219c04-7fa2-4ef3-922d-be29a60fe740', '2026-03-30 19:20:00.71', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (297, 'ตง.ถ.2-0035 ถนนสายราษฎร์อุทิศ 45.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0035 ถนนสายราษฎร์อุทิศ 45.jpg', 'image', NULL, '8d5ae887-5c81-4261-8e96-e4708e82cdd6', '2026-03-30 19:20:00.712', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (298, 'ตง.ถ.2-0035 ถนนสายราษฎร์อุทิศ 46.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0035 ถนนสายราษฎร์อุทิศ 46.jpg', 'image', NULL, '6ee6e51d-faa1-42d3-936f-31050d20d957', '2026-03-30 19:20:00.713', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (152, 'ตง.ถ.2-0012 ถนนรักษ์จันทร์(ตอนที่ 1)5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0012 ถนนรักษ์จันทร์(ตอนที่ 1)5.jpg', 'image', NULL, '976ade57-5ae8-4c15-8c6a-93d0480fac0f', '2026-03-30 19:20:00.621', NULL, NULL, NULL, NULL, 882);
INSERT INTO "public"."Uploads" VALUES (153, 'ตง.ถ.2-0012 ถนนรักษ์จันทร์(ตอนที่ 1)6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0012 ถนนรักษ์จันทร์(ตอนที่ 1)6.jpg', 'image', NULL, '8aca5b5c-df52-4d70-b3b9-8263aa1cca53', '2026-03-30 19:20:00.621', NULL, NULL, NULL, NULL, 882);
INSERT INTO "public"."Uploads" VALUES (154, 'ตง.ถ.2-0012 ถนนรักษ์จันทร์(ตอนที่ 1)7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0012 ถนนรักษ์จันทร์(ตอนที่ 1)7.jpg', 'image', NULL, '802b3728-4269-4698-825d-03ef3780887d', '2026-03-30 19:20:00.621', NULL, NULL, NULL, NULL, 882);
INSERT INTO "public"."Uploads" VALUES (351, 'ตง.ถ.2-0044 ถนนกันตังซอย 75.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0044 ถนนกันตังซอย 75.jpg', 'image', NULL, 'a9436f3c-81d0-4a6c-a593-0991f968bc2c', '2026-03-30 19:20:00.746', NULL, NULL, NULL, NULL, 908);
INSERT INTO "public"."Uploads" VALUES (155, 'ตง.ถ.2-0013 ถนนรักษ์จันทร์(ตอนที่ 2)1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0013 ถนนรักษ์จันทร์(ตอนที่ 2)1.jpg', 'image', NULL, '9a43e47e-a902-46d6-b6d4-b1314493436d', '2026-03-30 19:20:00.622', NULL, NULL, NULL, NULL, 883);
INSERT INTO "public"."Uploads" VALUES (156, 'ตง.ถ.2-0013 ถนนรักษ์จันทร์(ตอนที่ 2)2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0013 ถนนรักษ์จันทร์(ตอนที่ 2)2.jpg', 'image', NULL, '3f97f281-65e0-4ce6-afdc-62f263e6d769', '2026-03-30 19:20:00.622', NULL, NULL, NULL, NULL, 883);
INSERT INTO "public"."Uploads" VALUES (354, 'ตง.ถ.2-0045 ถนนกันตังซอย 81.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0045 ถนนกันตังซอย 81.jpg', 'image', NULL, '13e1320c-8956-492b-aabd-386572baa0e8', '2026-03-30 19:20:00.747', NULL, NULL, NULL, NULL, 909);
INSERT INTO "public"."Uploads" VALUES (157, 'ตง.ถ.2-0013 ถนนรักษ์จันทร์(ตอนที่ 2)3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0013 ถนนรักษ์จันทร์(ตอนที่ 2)3.jpg', 'image', NULL, '52cf98c4-b424-457a-9f59-93abb88a50ca', '2026-03-30 19:20:00.623', NULL, NULL, NULL, NULL, 883);
INSERT INTO "public"."Uploads" VALUES (355, 'ตง.ถ.2-0045 ถนนกันตังซอย 82.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0045 ถนนกันตังซอย 82.jpg', 'image', NULL, 'f0015cf4-3799-4284-b35a-619f6659f863', '2026-03-30 19:20:00.748', NULL, NULL, NULL, NULL, 909);
INSERT INTO "public"."Uploads" VALUES (158, 'ตง.ถ.2-0013 ถนนรักษ์จันทร์(ตอนที่ 2)4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0013 ถนนรักษ์จันทร์(ตอนที่ 2)4.jpg', 'image', NULL, '034f634d-c8da-4e61-ac41-799ffd7b9203', '2026-03-30 19:20:00.623', NULL, NULL, NULL, NULL, 883);
INSERT INTO "public"."Uploads" VALUES (159, 'ตง.ถ.2-0013 ถนนรักษ์จันทร์(ตอนที่ 2)5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0013 ถนนรักษ์จันทร์(ตอนที่ 2)5.jpg', 'image', NULL, '95aedbff-a5e3-46ba-aa73-cd8456f85687', '2026-03-30 19:20:00.624', NULL, NULL, NULL, NULL, 883);
INSERT INTO "public"."Uploads" VALUES (160, 'ตง.ถ.2-0013 ถนนรักษ์จันทร์(ตอนที่ 2)6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0013 ถนนรักษ์จันทร์(ตอนที่ 2)6.jpg', 'image', NULL, 'acafbb99-9fd6-4269-823e-80c298d9c3c1', '2026-03-30 19:20:00.624', NULL, NULL, NULL, NULL, 883);
INSERT INTO "public"."Uploads" VALUES (161, 'ตง.ถ.2-0013 ถนนรักษ์จันทร์(ตอนที่ 2)7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0013 ถนนรักษ์จันทร์(ตอนที่ 2)7.jpg', 'image', NULL, '0cd8322c-caf5-4fe7-aa60-2f8a190b791b', '2026-03-30 19:20:00.625', NULL, NULL, NULL, NULL, 883);
INSERT INTO "public"."Uploads" VALUES (162, 'ตง.ถ.2-0014 ถนนอุดมลาภ1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0014 ถนนอุดมลาภ1.jpg', 'image', NULL, 'd3129507-f540-4c0a-b96b-96f597dd5ebd', '2026-03-30 19:20:00.626', NULL, NULL, NULL, NULL, 884);
INSERT INTO "public"."Uploads" VALUES (163, 'ตง.ถ.2-0014 ถนนอุดมลาภ2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0014 ถนนอุดมลาภ2.jpg', 'image', NULL, 'ab116a4a-4f1e-49a4-a41e-e7f7d53a8f27', '2026-03-30 19:20:00.626', NULL, NULL, NULL, NULL, 884);
INSERT INTO "public"."Uploads" VALUES (164, 'ตง.ถ.2-0014 ถนนอุดมลาภ3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0014 ถนนอุดมลาภ3.jpg', 'image', NULL, '7f619ef1-327f-42c6-bd63-ebe719b6b2c6', '2026-03-30 19:20:00.626', NULL, NULL, NULL, NULL, 884);
INSERT INTO "public"."Uploads" VALUES (69, 'test-road-ถนน.jpg', 'http://localhost:3001/uploads/images/test-road-ถนน.jpg', 'image', 102093, 'de150174-7927-467f-8022-0c4410834fbd', '2026-03-30 12:06:13.056', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (165, 'ตง.ถ.2-0014 ถนนอุดมลาภ4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0014 ถนนอุดมลาภ4.jpg', 'image', NULL, 'ada11a7b-85f3-4265-bb35-e8c8f75d1d3b', '2026-03-30 19:20:00.627', NULL, NULL, NULL, NULL, 884);
INSERT INTO "public"."Uploads" VALUES (166, 'ตง.ถ.2-0014 ถนนอุดมลาภ5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0014 ถนนอุดมลาภ5.jpg', 'image', NULL, '47724f74-7903-4c00-b982-a334ee398088', '2026-03-30 19:20:00.627', NULL, NULL, NULL, NULL, 884);
INSERT INTO "public"."Uploads" VALUES (167, 'ตง.ถ.2-0014 ถนนอุดมลาภ6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0014 ถนนอุดมลาภ6.jpg', 'image', NULL, '192d657b-bb51-4a64-abf4-5545657e0489', '2026-03-30 19:20:00.628', NULL, NULL, NULL, NULL, 884);
INSERT INTO "public"."Uploads" VALUES (168, 'ตง.ถ.2-0014 ถนนอุดมลาภ7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0014 ถนนอุดมลาภ7.jpg', 'image', NULL, 'f71d0ed7-daf4-4c1c-a57d-881148685263', '2026-03-30 19:20:00.628', NULL, NULL, NULL, NULL, 884);
INSERT INTO "public"."Uploads" VALUES (169, 'ตง.ถ.2-0015 ถนนควนคีรี1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0015 ถนนควนคีรี1.jpg', 'image', NULL, '502b03f3-b207-4a95-96e2-1f9906b8b72d', '2026-03-30 19:20:00.629', NULL, NULL, NULL, NULL, 885);
INSERT INTO "public"."Uploads" VALUES (170, 'ตง.ถ.2-0015 ถนนควนคีรี2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0015 ถนนควนคีรี2.jpg', 'image', NULL, '7817b0f7-0de6-46c8-9e39-0812a86b34f4', '2026-03-30 19:20:00.629', NULL, NULL, NULL, NULL, 885);
INSERT INTO "public"."Uploads" VALUES (171, 'ตง.ถ.2-0015 ถนนควนคีรี3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0015 ถนนควนคีรี3.jpg', 'image', NULL, 'cb2906b6-df25-42b1-8ff7-ec7da7f2ecad', '2026-03-30 19:20:00.63', NULL, NULL, NULL, NULL, 885);
INSERT INTO "public"."Uploads" VALUES (172, 'ตง.ถ.2-0015 ถนนควนคีรี4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0015 ถนนควนคีรี4.jpg', 'image', NULL, '74c798e4-c3c2-4ae0-8a41-236d23368ae9', '2026-03-30 19:20:00.63', NULL, NULL, NULL, NULL, 885);
INSERT INTO "public"."Uploads" VALUES (173, 'ตง.ถ.2-0015 ถนนควนคีรี5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0015 ถนนควนคีรี5.jpg', 'image', NULL, '506343fd-0f58-4bb4-b0dc-5e7809e1fadd', '2026-03-30 19:20:00.631', NULL, NULL, NULL, NULL, 885);
INSERT INTO "public"."Uploads" VALUES (174, 'ตง.ถ.2-0015 ถนนควนคีรี6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0015 ถนนควนคีรี6.jpg', 'image', NULL, '8aef6b05-a4bf-480b-8da8-9efb8bd5f5f4', '2026-03-30 19:20:00.631', NULL, NULL, NULL, NULL, 885);
INSERT INTO "public"."Uploads" VALUES (175, 'ตง.ถ.2-0015 ถนนควนคีรี7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0015 ถนนควนคีรี7.jpg', 'image', NULL, '191d3cd4-274d-4dcb-9a09-ad764864dd6d', '2026-03-30 19:20:00.632', NULL, NULL, NULL, NULL, 885);
INSERT INTO "public"."Uploads" VALUES (176, 'ตง.ถ.2-0016 ถนนเพลินพิทักษ์1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0016 ถนนเพลินพิทักษ์1.jpg', 'image', NULL, 'cd0b76f1-466a-4659-bd4d-f9bfc5ab5b0a', '2026-03-30 19:20:00.632', NULL, NULL, NULL, NULL, 886);
INSERT INTO "public"."Uploads" VALUES (177, 'ตง.ถ.2-0016 ถนนเพลินพิทักษ์2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0016 ถนนเพลินพิทักษ์2.jpg', 'image', NULL, 'd4d06563-efc7-4c13-acbe-843b9f950efe', '2026-03-30 19:20:00.633', NULL, NULL, NULL, NULL, 886);
INSERT INTO "public"."Uploads" VALUES (178, 'ตง.ถ.2-0016 ถนนเพลินพิทักษ์3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0016 ถนนเพลินพิทักษ์3.jpg', 'image', NULL, '1e2e2047-1bf6-4fa8-bc1f-01de796e6daf', '2026-03-30 19:20:00.633', NULL, NULL, NULL, NULL, 886);
INSERT INTO "public"."Uploads" VALUES (179, 'ตง.ถ.2-0016 ถนนเพลินพิทักษ์4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0016 ถนนเพลินพิทักษ์4.jpg', 'image', NULL, '97a7a472-5038-458f-9074-c2584876a2bf', '2026-03-30 19:20:00.633', NULL, NULL, NULL, NULL, 886);
INSERT INTO "public"."Uploads" VALUES (180, 'ตง.ถ.2-0016 ถนนเพลินพิทักษ์5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0016 ถนนเพลินพิทักษ์5.jpg', 'image', NULL, '61dd24c6-c21e-4783-8b8e-e1ea31ffc5dd', '2026-03-30 19:20:00.634', NULL, NULL, NULL, NULL, 886);
INSERT INTO "public"."Uploads" VALUES (181, 'ตง.ถ.2-0016 ถนนเพลินพิทักษ์6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0016 ถนนเพลินพิทักษ์6.jpg', 'image', NULL, '4c9bee8d-8af1-44b3-98bb-2d003dc3f1bb', '2026-03-30 19:20:00.634', NULL, NULL, NULL, NULL, 886);
INSERT INTO "public"."Uploads" VALUES (182, 'ตง.ถ.2-0016 ถนนเพลินพิทักษ์7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0016 ถนนเพลินพิทักษ์7.jpg', 'image', NULL, '55e8c161-69b5-4e7b-b270-da76aee06d30', '2026-03-30 19:20:00.635', NULL, NULL, NULL, NULL, 886);
INSERT INTO "public"."Uploads" VALUES (183, 'ตง.ถ.2-0017 ถนนเวียนกะพัง(ตอนที่1)1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0017 ถนนเวียนกะพัง(ตอนที่1)1.jpg', 'image', NULL, 'f4c42302-188f-46ef-a2d8-72704a11b7a5', '2026-03-30 19:20:00.635', NULL, NULL, NULL, NULL, 887);
INSERT INTO "public"."Uploads" VALUES (184, 'ตง.ถ.2-0017 ถนนเวียนกะพัง(ตอนที่1)2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0017 ถนนเวียนกะพัง(ตอนที่1)2.jpg', 'image', NULL, 'cf7c8a6d-e2e0-4caa-8c86-c01d678693c8', '2026-03-30 19:20:00.636', NULL, NULL, NULL, NULL, 887);
INSERT INTO "public"."Uploads" VALUES (185, 'ตง.ถ.2-0017 ถนนเวียนกะพัง(ตอนที่1)3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0017 ถนนเวียนกะพัง(ตอนที่1)3.jpg', 'image', NULL, '433b9c84-5743-4af5-b585-bde1dc467779', '2026-03-30 19:20:00.636', NULL, NULL, NULL, NULL, 887);
INSERT INTO "public"."Uploads" VALUES (186, 'ตง.ถ.2-0017 ถนนเวียนกะพัง(ตอนที่1)4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0017 ถนนเวียนกะพัง(ตอนที่1)4.jpg', 'image', NULL, 'a60525d5-bb0d-4d41-a92a-7427597d62ca', '2026-03-30 19:20:00.637', NULL, NULL, NULL, NULL, 887);
INSERT INTO "public"."Uploads" VALUES (187, 'ตง.ถ.2-0017 ถนนเวียนกะพัง(ตอนที่1)5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0017 ถนนเวียนกะพัง(ตอนที่1)5.jpg', 'image', NULL, 'ac3010cd-3d8a-4770-9d71-604205fd2814', '2026-03-30 19:20:00.637', NULL, NULL, NULL, NULL, 887);
INSERT INTO "public"."Uploads" VALUES (188, 'ตง.ถ.2-0017 ถนนเวียนกะพัง(ตอนที่1)6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0017 ถนนเวียนกะพัง(ตอนที่1)6.jpg', 'image', NULL, '2e24f650-75db-48ec-9203-0e888f649121', '2026-03-30 19:20:00.637', NULL, NULL, NULL, NULL, 887);
INSERT INTO "public"."Uploads" VALUES (189, 'ตง.ถ.2-0017 ถนนเวียนกะพัง(ตอนที่1)7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0017 ถนนเวียนกะพัง(ตอนที่1)7.jpg', 'image', NULL, 'bd7f6a86-bea1-41af-ad4d-7d6f31d54327', '2026-03-30 19:20:00.638', NULL, NULL, NULL, NULL, 887);
INSERT INTO "public"."Uploads" VALUES (190, 'ตง.ถ.2-0018 ถนนเวียนกะพัง(ตอนที่2)1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0018 ถนนเวียนกะพัง(ตอนที่2)1.jpg', 'image', NULL, 'afe86534-ff91-4537-a8c7-2a2cd630fb1e', '2026-03-30 19:20:00.638', NULL, NULL, NULL, NULL, 888);
INSERT INTO "public"."Uploads" VALUES (191, 'ตง.ถ.2-0018 ถนนเวียนกะพัง(ตอนที่2)2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0018 ถนนเวียนกะพัง(ตอนที่2)2.jpg', 'image', NULL, 'eec6320c-7800-4d25-be6c-d238f22c2427', '2026-03-30 19:20:00.639', NULL, NULL, NULL, NULL, 888);
INSERT INTO "public"."Uploads" VALUES (192, 'ตง.ถ.2-0018 ถนนเวียนกะพัง(ตอนที่2)3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0018 ถนนเวียนกะพัง(ตอนที่2)3.jpg', 'image', NULL, '297060f3-b2f3-467d-a21d-e70d4a0f2957', '2026-03-30 19:20:00.639', NULL, NULL, NULL, NULL, 888);
INSERT INTO "public"."Uploads" VALUES (193, 'ตง.ถ.2-0018 ถนนเวียนกะพัง(ตอนที่2)4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0018 ถนนเวียนกะพัง(ตอนที่2)4.jpg', 'image', NULL, 'cb476720-b938-485d-9de3-299863d5a53d', '2026-03-30 19:20:00.64', NULL, NULL, NULL, NULL, 888);
INSERT INTO "public"."Uploads" VALUES (194, 'ตง.ถ.2-0018 ถนนเวียนกะพัง(ตอนที่2)5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0018 ถนนเวียนกะพัง(ตอนที่2)5.jpg', 'image', NULL, '365dbfc3-7ab9-4bb6-8670-81fbf35c182f', '2026-03-30 19:20:00.64', NULL, NULL, NULL, NULL, 888);
INSERT INTO "public"."Uploads" VALUES (195, 'ตง.ถ.2-0018 ถนนเวียนกะพัง(ตอนที่2)6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0018 ถนนเวียนกะพัง(ตอนที่2)6.jpg', 'image', NULL, '4fc97c91-fc00-4811-ac80-e8ff92edcc13', '2026-03-30 19:20:00.64', NULL, NULL, NULL, NULL, 888);
INSERT INTO "public"."Uploads" VALUES (196, 'ตง.ถ.2-0018 ถนนเวียนกะพัง(ตอนที่2)7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0018 ถนนเวียนกะพัง(ตอนที่2)7.jpg', 'image', NULL, '9693b17a-89ae-4c49-9369-bc90661f6827', '2026-03-30 19:20:00.641', NULL, NULL, NULL, NULL, 888);
INSERT INTO "public"."Uploads" VALUES (257, 'ตง.ถ.2-0030 ถนนสายควนหาญ1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0030 ถนนสายควนหาญ1.jpg', 'image', NULL, '4f33d756-9b3f-4fda-afde-b35f700e8594', '2026-03-30 19:20:00.685', NULL, NULL, NULL, NULL, 896);
INSERT INTO "public"."Uploads" VALUES (258, 'ตง.ถ.2-0030 ถนนสายควนหาญ2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0030 ถนนสายควนหาญ2.jpg', 'image', NULL, '7fbdffe5-d242-4106-bcdd-de31c2d08c4f', '2026-03-30 19:20:00.685', NULL, NULL, NULL, NULL, 896);
INSERT INTO "public"."Uploads" VALUES (259, 'ตง.ถ.2-0030 ถนนสายควนหาญ3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0030 ถนนสายควนหาญ3.jpg', 'image', NULL, 'dd2dae1c-e8f9-4c39-827e-8d4a2de87401', '2026-03-30 19:20:00.686', NULL, NULL, NULL, NULL, 896);
INSERT INTO "public"."Uploads" VALUES (333, 'ตง.ถ.2-0042 ถนนกันตังซอย 31.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0042 ถนนกันตังซอย 31.jpg', 'image', NULL, '77e69ce5-24cb-41f4-8b75-daaccb322cdc', '2026-03-30 19:20:00.734', NULL, NULL, NULL, NULL, 906);
INSERT INTO "public"."Uploads" VALUES (334, 'ตง.ถ.2-0042 ถนนกันตังซอย 32.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0042 ถนนกันตังซอย 32.jpg', 'image', NULL, 'f9b44800-6ab0-461f-9c73-43e6b282fcee', '2026-03-30 19:20:00.735', NULL, NULL, NULL, NULL, 906);
INSERT INTO "public"."Uploads" VALUES (335, 'ตง.ถ.2-0042 ถนนกันตังซอย 33.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0042 ถนนกันตังซอย 33.jpg', 'image', NULL, 'e84710b3-e93c-421a-b7d2-b510c1554995', '2026-03-30 19:20:00.736', NULL, NULL, NULL, NULL, 906);
INSERT INTO "public"."Uploads" VALUES (336, 'ตง.ถ.2-0042 ถนนกันตังซอย 34.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0042 ถนนกันตังซอย 34.jpg', 'image', NULL, 'b8468210-496c-4fa4-ab68-da143c4fddb6', '2026-03-30 19:20:00.737', NULL, NULL, NULL, NULL, 906);
INSERT INTO "public"."Uploads" VALUES (337, 'ตง.ถ.2-0042 ถนนกันตังซอย 35.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0042 ถนนกันตังซอย 35.jpg', 'image', NULL, '98dee50d-0a44-4900-b4e3-f69f3aeb2c81', '2026-03-30 19:20:00.738', NULL, NULL, NULL, NULL, 906);
INSERT INTO "public"."Uploads" VALUES (260, 'ตง.ถ.2-0030 ถนนสายควนหาญ4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0030 ถนนสายควนหาญ4.jpg', 'image', NULL, '898a8c6b-e574-4af1-9e50-88f1c8882dee', '2026-03-30 19:20:00.686', NULL, NULL, NULL, NULL, 896);
INSERT INTO "public"."Uploads" VALUES (261, 'ตง.ถ.2-0030 ถนนสายควนหาญ5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0030 ถนนสายควนหาญ5.jpg', 'image', NULL, '4bda9f61-4e89-4485-9f56-ab63d0f6d640', '2026-03-30 19:20:00.687', NULL, NULL, NULL, NULL, 896);
INSERT INTO "public"."Uploads" VALUES (262, 'ตง.ถ.2-0030 ถนนสายควนหาญ6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0030 ถนนสายควนหาญ6.jpg', 'image', NULL, '65a31e02-7d46-4fc9-b033-3bc9b75d6e64', '2026-03-30 19:20:00.688', NULL, NULL, NULL, NULL, 896);
INSERT INTO "public"."Uploads" VALUES (502, 'ตง.ถ.2-0066 ถนนห้วยยอด ซอย 91.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0066 ถนนห้วยยอด ซอย 91.jpg', 'image', NULL, '34d84d37-d6ee-45b7-b785-8a0616e6376f', '2026-03-30 19:20:00.838', NULL, NULL, NULL, NULL, 930);
INSERT INTO "public"."Uploads" VALUES (503, 'ตง.ถ.2-0066 ถนนห้วยยอด ซอย 92.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0066 ถนนห้วยยอด ซอย 92.jpg', 'image', NULL, '5598dfe5-4e20-4311-868d-91fb4da3ee14', '2026-03-30 19:20:00.839', NULL, NULL, NULL, NULL, 930);
INSERT INTO "public"."Uploads" VALUES (504, 'ตง.ถ.2-0066 ถนนห้วยยอด ซอย 93.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0066 ถนนห้วยยอด ซอย 93.jpg', 'image', NULL, '86ddf74c-e79d-4272-a18c-8222ff7dbad0', '2026-03-30 19:20:00.839', NULL, NULL, NULL, NULL, 930);
INSERT INTO "public"."Uploads" VALUES (505, 'ตง.ถ.2-0066 ถนนห้วยยอด ซอย 94.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0066 ถนนห้วยยอด ซอย 94.jpg', 'image', NULL, '0d2a5666-965c-45cf-8fe9-450be04a24ce', '2026-03-30 19:20:00.84', NULL, NULL, NULL, NULL, 930);
INSERT INTO "public"."Uploads" VALUES (506, 'ตง.ถ.2-0066 ถนนห้วยยอด ซอย 95.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0066 ถนนห้วยยอด ซอย 95.jpg', 'image', NULL, 'c8ac6f76-86fa-4ae4-9fce-5a7eb60ff2fc', '2026-03-30 19:20:00.841', NULL, NULL, NULL, NULL, 930);
INSERT INTO "public"."Uploads" VALUES (507, 'ตง.ถ.2-0066 ถนนห้วยยอด ซอย 96.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0066 ถนนห้วยยอด ซอย 96.jpg', 'image', NULL, '351581a3-f409-4c3a-a54e-52e5bc6b282d', '2026-03-30 19:20:00.841', NULL, NULL, NULL, NULL, 930);
INSERT INTO "public"."Uploads" VALUES (508, 'ตง.ถ.2-0066 ถนนห้วยยอด ซอย 97.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0066 ถนนห้วยยอด ซอย 97.jpg', 'image', NULL, 'da00280f-54d7-4362-b16e-8d57f87724d5', '2026-03-30 19:20:00.842', NULL, NULL, NULL, NULL, 930);
INSERT INTO "public"."Uploads" VALUES (509, 'ตง.ถ.2-0067 ถนนห้วยยอด ซอย 101.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0067 ถนนห้วยยอด ซอย 101.jpg', 'image', NULL, '3d30e1d1-b624-4a06-ba46-7f64d5c31884', '2026-03-30 19:20:00.843', NULL, NULL, NULL, NULL, 931);
INSERT INTO "public"."Uploads" VALUES (510, 'ตง.ถ.2-0067 ถนนห้วยยอด ซอย 102.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0067 ถนนห้วยยอด ซอย 102.jpg', 'image', NULL, '102d45f4-c72f-49e7-a0c7-c2fdeb2aa4ae', '2026-03-30 19:20:00.843', NULL, NULL, NULL, NULL, 931);
INSERT INTO "public"."Uploads" VALUES (511, 'ตง.ถ.2-0067 ถนนห้วยยอด ซอย 103.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0067 ถนนห้วยยอด ซอย 103.jpg', 'image', NULL, 'e730b1bf-d9cb-4343-aa74-431de6c54edb', '2026-03-30 19:20:00.844', NULL, NULL, NULL, NULL, 931);
INSERT INTO "public"."Uploads" VALUES (512, 'ตง.ถ.2-0067 ถนนห้วยยอด ซอย 104.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0067 ถนนห้วยยอด ซอย 104.jpg', 'image', NULL, '3033181a-ff7e-4702-b930-1633d993bb03', '2026-03-30 19:20:00.844', NULL, NULL, NULL, NULL, 931);
INSERT INTO "public"."Uploads" VALUES (513, 'ตง.ถ.2-0067 ถนนห้วยยอด ซอย 105.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0067 ถนนห้วยยอด ซอย 105.jpg', 'image', NULL, 'fec82e5e-bb4b-48f1-aca7-396eea3c193f', '2026-03-30 19:20:00.845', NULL, NULL, NULL, NULL, 931);
INSERT INTO "public"."Uploads" VALUES (514, 'ตง.ถ.2-0067 ถนนห้วยยอด ซอย 106.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0067 ถนนห้วยยอด ซอย 106.jpg', 'image', NULL, '5815f9a4-f532-4ca1-9b1c-56ca56d86039', '2026-03-30 19:20:00.845', NULL, NULL, NULL, NULL, 931);
INSERT INTO "public"."Uploads" VALUES (515, 'ตง.ถ.2-0067 ถนนห้วยยอด ซอย 107.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0067 ถนนห้วยยอด ซอย 107.jpg', 'image', NULL, 'b7f22868-e966-40f9-85a8-ef20f2cf87bc', '2026-03-30 19:20:00.846', NULL, NULL, NULL, NULL, 931);
INSERT INTO "public"."Uploads" VALUES (197, 'ตง.ถ.2-0019 ถนนสังขวิทย์1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0019 ถนนสังขวิทย์1.jpg', 'image', NULL, '86715acd-5aa0-4b1d-aaf3-76e20415b623', '2026-03-30 19:20:00.641', NULL, NULL, NULL, NULL, 889);
INSERT INTO "public"."Uploads" VALUES (198, 'ตง.ถ.2-0019 ถนนสังขวิทย์2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0019 ถนนสังขวิทย์2.jpg', 'image', NULL, 'ff4bd93f-7903-488b-bc4f-21fa336ffaf5', '2026-03-30 19:20:00.642', NULL, NULL, NULL, NULL, 889);
INSERT INTO "public"."Uploads" VALUES (199, 'ตง.ถ.2-0019 ถนนสังขวิทย์3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0019 ถนนสังขวิทย์3.jpg', 'image', NULL, 'ae3caed5-c2fe-4d34-94fb-60e8862a4e9e', '2026-03-30 19:20:00.642', NULL, NULL, NULL, NULL, 889);
INSERT INTO "public"."Uploads" VALUES (200, 'ตง.ถ.2-0019 ถนนสังขวิทย์4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0019 ถนนสังขวิทย์4.jpg', 'image', NULL, '960d02da-5308-43e4-91de-1bb1d63bed09', '2026-03-30 19:20:00.642', NULL, NULL, NULL, NULL, 889);
INSERT INTO "public"."Uploads" VALUES (338, 'ตง.ถ.2-0042 ถนนกันตังซอย 36.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0042 ถนนกันตังซอย 36.jpg', 'image', NULL, '183e663b-b5da-4e3b-865d-64e92a827443', '2026-03-30 19:20:00.738', NULL, NULL, NULL, NULL, 906);
INSERT INTO "public"."Uploads" VALUES (201, 'ตง.ถ.2-0019 ถนนสังขวิทย์5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0019 ถนนสังขวิทย์5.jpg', 'image', NULL, 'd4743247-b8be-47e6-9a19-566250d1247d', '2026-03-30 19:20:00.643', NULL, NULL, NULL, NULL, 889);
INSERT INTO "public"."Uploads" VALUES (202, 'ตง.ถ.2-0019 ถนนสังขวิทย์6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0019 ถนนสังขวิทย์6.jpg', 'image', NULL, 'e0736952-c7e1-46b0-b0fe-180c86fc59e8', '2026-03-30 19:20:00.643', NULL, NULL, NULL, NULL, 889);
INSERT INTO "public"."Uploads" VALUES (339, 'ตง.ถ.2-0042 ถนนกันตังซอย 37.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0042 ถนนกันตังซอย 37.jpg', 'image', NULL, 'a454ef02-40a1-46e5-8660-82b529be0869', '2026-03-30 19:20:00.739', NULL, NULL, NULL, NULL, 906);
INSERT INTO "public"."Uploads" VALUES (203, 'ตง.ถ.2-0019 ถนนสังขวิทย์7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0019 ถนนสังขวิทย์7.jpg', 'image', NULL, 'b2e314d4-8082-4273-83d2-5dedeeb47a88', '2026-03-30 19:20:00.653', NULL, NULL, NULL, NULL, 889);
INSERT INTO "public"."Uploads" VALUES (204, 'ตง.ถ.2-0020 ถนนท่ากลาง1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0020 ถนนท่ากลาง1.jpg', 'image', NULL, 'af44347e-d9aa-40a9-8bf8-ba0404e7a678', '2026-03-30 19:20:00.654', NULL, NULL, NULL, NULL, 890);
INSERT INTO "public"."Uploads" VALUES (205, 'ตง.ถ.2-0020 ถนนท่ากลาง2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0020 ถนนท่ากลาง2.jpg', 'image', NULL, '9328fa25-a5d1-478a-b3a1-1693ef15691f', '2026-03-30 19:20:00.654', NULL, NULL, NULL, NULL, 890);
INSERT INTO "public"."Uploads" VALUES (206, 'ตง.ถ.2-0020 ถนนท่ากลาง3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0020 ถนนท่ากลาง3.jpg', 'image', NULL, '8095a2a8-a039-4b93-a34c-83bd80d15bce', '2026-03-30 19:20:00.655', NULL, NULL, NULL, NULL, 890);
INSERT INTO "public"."Uploads" VALUES (207, 'ตง.ถ.2-0020 ถนนท่ากลาง4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0020 ถนนท่ากลาง4.jpg', 'image', NULL, '5e9f652e-55d8-4231-b539-49dec78dcfc1', '2026-03-30 19:20:00.655', NULL, NULL, NULL, NULL, 890);
INSERT INTO "public"."Uploads" VALUES (208, 'ตง.ถ.2-0020 ถนนท่ากลาง5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0020 ถนนท่ากลาง5.jpg', 'image', NULL, '1366b40e-018c-41de-928b-03a64901768c', '2026-03-30 19:20:00.656', NULL, NULL, NULL, NULL, 890);
INSERT INTO "public"."Uploads" VALUES (209, 'ตง.ถ.2-0020 ถนนท่ากลาง6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0020 ถนนท่ากลาง6.jpg', 'image', NULL, '299772d9-2470-4c1d-bb8c-7b1b053b6ced', '2026-03-30 19:20:00.656', NULL, NULL, NULL, NULL, 890);
INSERT INTO "public"."Uploads" VALUES (210, 'ตง.ถ.2-0020 ถนนท่ากลาง7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0020 ถนนท่ากลาง7.jpg', 'image', NULL, '4345e2e2-a219-4e84-8318-685b05e9e951', '2026-03-30 19:20:00.657', NULL, NULL, NULL, NULL, 890);
INSERT INTO "public"."Uploads" VALUES (211, 'ตง.ถ.2-0021 ถนนรื่นรมย์1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0021 ถนนรื่นรมย์1.jpg', 'image', NULL, '3df8c844-14c5-4324-8bc1-f893934702d4', '2026-03-30 19:20:00.657', NULL, NULL, NULL, NULL, 891);
INSERT INTO "public"."Uploads" VALUES (212, 'ตง.ถ.2-0021 ถนนรื่นรมย์2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0021 ถนนรื่นรมย์2.jpg', 'image', NULL, 'c73d2cf7-864b-4647-bf7c-e76771bd0939', '2026-03-30 19:20:00.658', NULL, NULL, NULL, NULL, 891);
INSERT INTO "public"."Uploads" VALUES (213, 'ตง.ถ.2-0021 ถนนรื่นรมย์3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0021 ถนนรื่นรมย์3.jpg', 'image', NULL, '0f3117c7-a9a0-46e3-85f0-8a692d6260d3', '2026-03-30 19:20:00.658', NULL, NULL, NULL, NULL, 891);
INSERT INTO "public"."Uploads" VALUES (214, 'ตง.ถ.2-0021 ถนนรื่นรมย์4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0021 ถนนรื่นรมย์4.jpg', 'image', NULL, 'd402eb8e-7f12-4e62-8481-21e797a41820', '2026-03-30 19:20:00.659', NULL, NULL, NULL, NULL, 891);
INSERT INTO "public"."Uploads" VALUES (215, 'ตง.ถ.2-0021 ถนนรื่นรมย์5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0021 ถนนรื่นรมย์5.jpg', 'image', NULL, '1aad7126-75c0-478e-90be-196a1354b5e9', '2026-03-30 19:20:00.66', NULL, NULL, NULL, NULL, 891);
INSERT INTO "public"."Uploads" VALUES (216, 'ตง.ถ.2-0021 ถนนรื่นรมย์6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0021 ถนนรื่นรมย์6.jpg', 'image', NULL, 'b9faf78a-10e0-4205-927a-92903c6f0d5a', '2026-03-30 19:20:00.661', NULL, NULL, NULL, NULL, 891);
INSERT INTO "public"."Uploads" VALUES (217, 'ตง.ถ.2-0021 ถนนรื่นรมย์7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0021 ถนนรื่นรมย์7.jpg', 'image', NULL, 'aec9f0b1-eeed-449d-b156-0ce9064dbb2b', '2026-03-30 19:20:00.662', NULL, NULL, NULL, NULL, 891);
INSERT INTO "public"."Uploads" VALUES (218, 'ตง.ถ.2-0022 ถนนวังตอ1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0022 ถนนวังตอ1.jpg', 'image', NULL, '6cc26761-567e-4242-8c72-909feddf3756', '2026-03-30 19:20:00.662', NULL, NULL, NULL, NULL, 892);
INSERT INTO "public"."Uploads" VALUES (219, 'ตง.ถ.2-0022 ถนนวังตอ2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0022 ถนนวังตอ2.jpg', 'image', NULL, '1427a611-2703-4801-8005-0b8094b99f25', '2026-03-30 19:20:00.663', NULL, NULL, NULL, NULL, 892);
INSERT INTO "public"."Uploads" VALUES (220, 'ตง.ถ.2-0022 ถนนวังตอ3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0022 ถนนวังตอ3.jpg', 'image', NULL, '3ea827a7-cbf3-4331-8891-ba6292657b72', '2026-03-30 19:20:00.663', NULL, NULL, NULL, NULL, 892);
INSERT INTO "public"."Uploads" VALUES (221, 'ตง.ถ.2-0022 ถนนวังตอ4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0022 ถนนวังตอ4.jpg', 'image', NULL, '6ad5c0c7-4a25-44db-b374-62640994bd24', '2026-03-30 19:20:00.663', NULL, NULL, NULL, NULL, 892);
INSERT INTO "public"."Uploads" VALUES (222, 'ตง.ถ.2-0022 ถนนวังตอ5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0022 ถนนวังตอ5.jpg', 'image', NULL, '0ef27e1c-cb96-4f98-b65c-f17566aa1801', '2026-03-30 19:20:00.664', NULL, NULL, NULL, NULL, 892);
INSERT INTO "public"."Uploads" VALUES (223, 'ตง.ถ.2-0022 ถนนวังตอ6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0022 ถนนวังตอ6.jpg', 'image', NULL, 'ac237ac1-da43-42b4-b147-1f75905a5e89', '2026-03-30 19:20:00.664', NULL, NULL, NULL, NULL, 892);
INSERT INTO "public"."Uploads" VALUES (224, 'ตง.ถ.2-0022 ถนนวังตอ7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0022 ถนนวังตอ7.jpg', 'image', NULL, '38ccd532-b3a7-4a6d-98e5-de77ae1f6fd5', '2026-03-30 19:20:00.665', NULL, NULL, NULL, NULL, 892);
INSERT INTO "public"."Uploads" VALUES (225, 'ตง.ถ.2-0023 ถนนหนองยวน1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0023 ถนนหนองยวน1.jpg', 'image', NULL, '7242d0af-a26d-480b-91eb-e6d203dcd3b2', '2026-03-30 19:20:00.665', NULL, NULL, NULL, NULL, 893);
INSERT INTO "public"."Uploads" VALUES (226, 'ตง.ถ.2-0023 ถนนหนองยวน2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0023 ถนนหนองยวน2.jpg', 'image', NULL, '4f354001-029b-4b28-93f5-844574492d58', '2026-03-30 19:20:00.666', NULL, NULL, NULL, NULL, 893);
INSERT INTO "public"."Uploads" VALUES (227, 'ตง.ถ.2-0023 ถนนหนองยวน3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0023 ถนนหนองยวน3.jpg', 'image', NULL, '283ae428-4953-46ff-9d2b-0383461a10b4', '2026-03-30 19:20:00.667', NULL, NULL, NULL, NULL, 893);
INSERT INTO "public"."Uploads" VALUES (228, 'ตง.ถ.2-0023 ถนนหนองยวน4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0023 ถนนหนองยวน4.jpg', 'image', NULL, '5ef7e4e6-a465-4587-93ba-89bd149d1f78', '2026-03-30 19:20:00.667', NULL, NULL, NULL, NULL, 893);
INSERT INTO "public"."Uploads" VALUES (229, 'ตง.ถ.2-0023 ถนนหนองยวน5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0023 ถนนหนองยวน5.jpg', 'image', NULL, 'e86b2d8d-5a67-4c0d-8d30-3b62c25a6aa9', '2026-03-30 19:20:00.668', NULL, NULL, NULL, NULL, 893);
INSERT INTO "public"."Uploads" VALUES (230, 'ตง.ถ.2-0023 ถนนหนองยวน6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0023 ถนนหนองยวน6.jpg', 'image', NULL, '854fc5ee-56b1-4fd2-b927-ca081a6c4271', '2026-03-30 19:20:00.668', NULL, NULL, NULL, NULL, 893);
INSERT INTO "public"."Uploads" VALUES (231, 'ตง.ถ.2-0023 ถนนหนองยวน7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0023 ถนนหนองยวน7.jpg', 'image', NULL, '43f5b621-c920-4292-b656-7cb13d7cf729', '2026-03-30 19:20:00.669', NULL, NULL, NULL, NULL, 893);
INSERT INTO "public"."Uploads" VALUES (232, 'ตง.ถ.2-0024 ถนนสายน้ำผุดใต้(ผ่านสวนสมเด็จ)1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0024 ถนนสายน้ำผุดใต้(ผ่านสวนสมเด็จ)1.jpg', 'image', NULL, '9fcc47d4-f945-4e2d-93b3-d996f6a2e308', '2026-03-30 19:20:00.669', NULL, NULL, NULL, NULL, 894);
INSERT INTO "public"."Uploads" VALUES (233, 'ตง.ถ.2-0024 ถนนสายน้ำผุดใต้(ผ่านสวนสมเด็จ)2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0024 ถนนสายน้ำผุดใต้(ผ่านสวนสมเด็จ)2.jpg', 'image', NULL, 'e77c7518-88b9-4274-9907-f172909d89e9', '2026-03-30 19:20:00.67', NULL, NULL, NULL, NULL, 894);
INSERT INTO "public"."Uploads" VALUES (340, 'ตง.ถ.2-0043 ถนนกันตังซอย 61.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0043 ถนนกันตังซอย 61.jpg', 'image', NULL, 'c5566c1d-331e-492a-a6d7-41c3fcda6277', '2026-03-30 19:20:00.74', NULL, NULL, NULL, NULL, 907);
INSERT INTO "public"."Uploads" VALUES (234, 'ตง.ถ.2-0024 ถนนสายน้ำผุดใต้(ผ่านสวนสมเด็จ)3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0024 ถนนสายน้ำผุดใต้(ผ่านสวนสมเด็จ)3.jpg', 'image', NULL, '64616369-19eb-4bc0-bf22-2e5038e294cb', '2026-03-30 19:20:00.67', NULL, NULL, NULL, NULL, 894);
INSERT INTO "public"."Uploads" VALUES (235, 'ตง.ถ.2-0024 ถนนสายน้ำผุดใต้(ผ่านสวนสมเด็จ)4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0024 ถนนสายน้ำผุดใต้(ผ่านสวนสมเด็จ)4.jpg', 'image', NULL, '817a2cb3-7977-4fae-bd0d-5a3d7a999c7b', '2026-03-30 19:20:00.671', NULL, NULL, NULL, NULL, 894);
INSERT INTO "public"."Uploads" VALUES (236, 'ตง.ถ.2-0024 ถนนสายน้ำผุดใต้(ผ่านสวนสมเด็จ)5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0024 ถนนสายน้ำผุดใต้(ผ่านสวนสมเด็จ)5.jpg', 'image', NULL, 'b3e1d4ef-8083-44dd-8c11-ee7bbbd49f43', '2026-03-30 19:20:00.671', NULL, NULL, NULL, NULL, 894);
INSERT INTO "public"."Uploads" VALUES (237, 'ตง.ถ.2-0024 ถนนสายน้ำผุดใต้(ผ่านสวนสมเด็จ)6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0024 ถนนสายน้ำผุดใต้(ผ่านสวนสมเด็จ)6.jpg', 'image', NULL, 'b6383404-cb82-4adc-901e-e9958de20790', '2026-03-30 19:20:00.671', NULL, NULL, NULL, NULL, 894);
INSERT INTO "public"."Uploads" VALUES (238, 'ตง.ถ.2-0024 ถนนสายน้ำผุดใต้(ผ่านสวนสมเด็จ)7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0024 ถนนสายน้ำผุดใต้(ผ่านสวนสมเด็จ)7.jpg', 'image', NULL, '71bac2e3-ba19-43d6-986c-4ddfa61192fc', '2026-03-30 19:20:00.672', NULL, NULL, NULL, NULL, 894);
INSERT INTO "public"."Uploads" VALUES (251, 'ตง.ถ.2-0029 ถนนสายควนวิเศษ1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0029 ถนนสายควนวิเศษ1.jpg', 'image', NULL, '073631a6-7c17-49a7-a087-d6fc34a90cea', '2026-03-30 19:20:00.682', NULL, NULL, NULL, NULL, 895);
INSERT INTO "public"."Uploads" VALUES (252, 'ตง.ถ.2-0029 ถนนสายควนวิเศษ2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0029 ถนนสายควนวิเศษ2.jpg', 'image', NULL, '9e146887-ab75-4d96-9958-4d1ab1b2e886', '2026-03-30 19:20:00.682', NULL, NULL, NULL, NULL, 895);
INSERT INTO "public"."Uploads" VALUES (253, 'ตง.ถ.2-0029 ถนนสายควนวิเศษ3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0029 ถนนสายควนวิเศษ3.jpg', 'image', NULL, '8c92a815-cd00-4289-ae94-a368f00b856a', '2026-03-30 19:20:00.683', NULL, NULL, NULL, NULL, 895);
INSERT INTO "public"."Uploads" VALUES (254, 'ตง.ถ.2-0029 ถนนสายควนวิเศษ4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0029 ถนนสายควนวิเศษ4.jpg', 'image', NULL, '5914e42d-141d-4a94-9679-7f6a0f027436', '2026-03-30 19:20:00.683', NULL, NULL, NULL, NULL, 895);
INSERT INTO "public"."Uploads" VALUES (255, 'ตง.ถ.2-0029 ถนนสายควนวิเศษ5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0029 ถนนสายควนวิเศษ5.jpg', 'image', NULL, 'c36e16b7-2ec9-44d2-86f8-0a511c71e602', '2026-03-30 19:20:00.684', NULL, NULL, NULL, NULL, 895);
INSERT INTO "public"."Uploads" VALUES (256, 'ตง.ถ.2-0029 ถนนสายควนวิเศษ6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0029 ถนนสายควนวิเศษ6.jpg', 'image', NULL, '29ea16d4-0d89-49c9-b1c5-be1998694e41', '2026-03-30 19:20:00.684', NULL, NULL, NULL, NULL, 895);
INSERT INTO "public"."Uploads" VALUES (495, 'ตง.ถ.2-0065 ถนนห้วยยอด ซอย 8-1 (ซอยยุพา)1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0065 ถนนห้วยยอด ซอย 8-1 (ซอยยุพา)1.jpg', 'image', NULL, '067da22a-5bdc-4092-aa0d-7eef80fa80a9', '2026-03-30 19:20:00.833', NULL, NULL, NULL, NULL, 929);
INSERT INTO "public"."Uploads" VALUES (496, 'ตง.ถ.2-0065 ถนนห้วยยอด ซอย 8-1 (ซอยยุพา)2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0065 ถนนห้วยยอด ซอย 8-1 (ซอยยุพา)2.jpg', 'image', NULL, '4fb692a3-43e7-4bd1-ae3c-3b957cd820ca', '2026-03-30 19:20:00.834', NULL, NULL, NULL, NULL, 929);
INSERT INTO "public"."Uploads" VALUES (497, 'ตง.ถ.2-0065 ถนนห้วยยอด ซอย 8-1 (ซอยยุพา)3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0065 ถนนห้วยยอด ซอย 8-1 (ซอยยุพา)3.jpg', 'image', NULL, '5bbfb4bb-acd9-475f-ae37-2ce362b3af62', '2026-03-30 19:20:00.835', NULL, NULL, NULL, NULL, 929);
INSERT INTO "public"."Uploads" VALUES (498, 'ตง.ถ.2-0065 ถนนห้วยยอด ซอย 8-1 (ซอยยุพา)4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0065 ถนนห้วยยอด ซอย 8-1 (ซอยยุพา)4.jpg', 'image', NULL, '17fb9277-ac93-40b9-a563-0eda67381373', '2026-03-30 19:20:00.836', NULL, NULL, NULL, NULL, 929);
INSERT INTO "public"."Uploads" VALUES (499, 'ตง.ถ.2-0065 ถนนห้วยยอด ซอย 8-1 (ซอยยุพา)5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0065 ถนนห้วยยอด ซอย 8-1 (ซอยยุพา)5.jpg', 'image', NULL, '948a0a99-982c-4af7-8459-38a192cfefa4', '2026-03-30 19:20:00.837', NULL, NULL, NULL, NULL, 929);
INSERT INTO "public"."Uploads" VALUES (500, 'ตง.ถ.2-0065 ถนนห้วยยอด ซอย 8-1 (ซอยยุพา)6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0065 ถนนห้วยยอด ซอย 8-1 (ซอยยุพา)6.jpg', 'image', NULL, '00565353-9dc1-4dcd-841a-805210189711', '2026-03-30 19:20:00.837', NULL, NULL, NULL, NULL, 929);
INSERT INTO "public"."Uploads" VALUES (501, 'ตง.ถ.2-0065 ถนนห้วยยอด ซอย 8-1 (ซอยยุพา)7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0065 ถนนห้วยยอด ซอย 8-1 (ซอยยุพา)7.jpg', 'image', NULL, '6dfa2c66-6b68-48d6-b199-1dd158695491', '2026-03-30 19:20:00.838', NULL, NULL, NULL, NULL, 929);
INSERT INTO "public"."Uploads" VALUES (263, 'ตง.ถ.2-0031ถนนสายราษฎร์อุทิศ (รอบรพ.ตรั.1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0031ถนนสายราษฎร์อุทิศ (รอบรพ.ตรั.1.jpg', 'image', NULL, 'e2a35ceb-d067-4344-ae8c-adb78a3c2528', '2026-03-30 19:20:00.688', NULL, NULL, NULL, NULL, 897);
INSERT INTO "public"."Uploads" VALUES (264, 'ตง.ถ.2-0031ถนนสายราษฎร์อุทิศ (รอบรพ.ตรั.2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0031ถนนสายราษฎร์อุทิศ (รอบรพ.ตรั.2.jpg', 'image', NULL, '0db40db4-2c88-4887-aefc-428e6330f6df', '2026-03-30 19:20:00.689', NULL, NULL, NULL, NULL, 897);
INSERT INTO "public"."Uploads" VALUES (265, 'ตง.ถ.2-0031ถนนสายราษฎร์อุทิศ (รอบรพ.ตรั.3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0031ถนนสายราษฎร์อุทิศ (รอบรพ.ตรั.3.jpg', 'image', NULL, 'd8cde9ee-35c1-481d-95e1-5e35ee5ca8af', '2026-03-30 19:20:00.689', NULL, NULL, NULL, NULL, 897);
INSERT INTO "public"."Uploads" VALUES (266, 'ตง.ถ.2-0031ถนนสายราษฎร์อุทิศ (รอบรพ.ตรั.4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0031ถนนสายราษฎร์อุทิศ (รอบรพ.ตรั.4.jpg', 'image', NULL, 'efd8f9f9-23e1-4a56-a1cb-1a32970818bc', '2026-03-30 19:20:00.69', NULL, NULL, NULL, NULL, 897);
INSERT INTO "public"."Uploads" VALUES (267, 'ตง.ถ.2-0031ถนนสายราษฎร์อุทิศ (รอบรพ.ตรั.5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0031ถนนสายราษฎร์อุทิศ (รอบรพ.ตรั.5.jpg', 'image', NULL, 'fba47547-5ccf-4e04-bb93-cd9eee3eea1a', '2026-03-30 19:20:00.69', NULL, NULL, NULL, NULL, 897);
INSERT INTO "public"."Uploads" VALUES (268, 'ตง.ถ.2-0031ถนนสายราษฎร์อุทิศ (รอบรพ.ตรั.6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0031ถนนสายราษฎร์อุทิศ (รอบรพ.ตรั.6.jpg', 'image', NULL, '7b96421c-344b-44ca-9e40-80b7cb9f70a7', '2026-03-30 19:20:00.691', NULL, NULL, NULL, NULL, 897);
INSERT INTO "public"."Uploads" VALUES (341, 'ตง.ถ.2-0043 ถนนกันตังซอย 62.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0043 ถนนกันตังซอย 62.jpg', 'image', NULL, 'b82f0775-f055-4e7c-8b99-44a7042f1e24', '2026-03-30 19:20:00.741', NULL, NULL, NULL, NULL, 907);
INSERT INTO "public"."Uploads" VALUES (342, 'ตง.ถ.2-0043 ถนนกันตังซอย 63.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0043 ถนนกันตังซอย 63.jpg', 'image', NULL, 'ffa5c936-aaa4-4fcf-964b-c567173371b9', '2026-03-30 19:20:00.741', NULL, NULL, NULL, NULL, 907);
INSERT INTO "public"."Uploads" VALUES (343, 'ตง.ถ.2-0043 ถนนกันตังซอย 64.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0043 ถนนกันตังซอย 64.jpg', 'image', NULL, 'ea8f0c40-e19a-4631-9ef1-e6008788b6d2', '2026-03-30 19:20:00.742', NULL, NULL, NULL, NULL, 907);
INSERT INTO "public"."Uploads" VALUES (269, 'ตง.ถ.2-0031ถนนสายราษฎร์อุทิศ (รอบรพ.ตรัง)1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0031ถนนสายราษฎร์อุทิศ (รอบรพ.ตรัง)1.jpg', 'image', NULL, '4f03a3d8-1204-44bd-aa1f-558cc9659d3a', '2026-03-30 19:20:00.691', NULL, NULL, NULL, NULL, 897);
INSERT INTO "public"."Uploads" VALUES (270, 'ตง.ถ.2-0031ถนนสายราษฎร์อุทิศ (รอบรพ.ตรัง)2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0031ถนนสายราษฎร์อุทิศ (รอบรพ.ตรัง)2.jpg', 'image', NULL, '065ba606-0b37-457c-86fa-1c6aa0cdd357', '2026-03-30 19:20:00.692', NULL, NULL, NULL, NULL, 897);
INSERT INTO "public"."Uploads" VALUES (271, 'ตง.ถ.2-0031ถนนสายราษฎร์อุทิศ (รอบรพ.ตรัง)3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0031ถนนสายราษฎร์อุทิศ (รอบรพ.ตรัง)3.jpg', 'image', NULL, 'eddd9869-66a8-4bfd-a467-f44e71a12d04', '2026-03-30 19:20:00.692', NULL, NULL, NULL, NULL, 897);
INSERT INTO "public"."Uploads" VALUES (272, 'ตง.ถ.2-0031ถนนสายราษฎร์อุทิศ (รอบรพ.ตรัง)4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0031ถนนสายราษฎร์อุทิศ (รอบรพ.ตรัง)4.jpg', 'image', NULL, '9c56d314-51d1-48fc-9a89-d8edc1708b82', '2026-03-30 19:20:00.693', NULL, NULL, NULL, NULL, 897);
INSERT INTO "public"."Uploads" VALUES (273, 'ตง.ถ.2-0031ถนนสายราษฎร์อุทิศ (รอบรพ.ตรัง)5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0031ถนนสายราษฎร์อุทิศ (รอบรพ.ตรัง)5.jpg', 'image', NULL, 'dc9fb969-afb8-425d-ac69-eac058504ca4', '2026-03-30 19:20:00.693', NULL, NULL, NULL, NULL, 897);
INSERT INTO "public"."Uploads" VALUES (274, 'ตง.ถ.2-0031ถนนสายราษฎร์อุทิศ (รอบรพ.ตรัง)6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0031ถนนสายราษฎร์อุทิศ (รอบรพ.ตรัง)6.jpg', 'image', NULL, 'b5fb320e-70b9-4832-8f86-0bfc401f4c42', '2026-03-30 19:20:00.694', NULL, NULL, NULL, NULL, 897);
INSERT INTO "public"."Uploads" VALUES (275, 'ตง.ถ.2-0032ถนนสายราษฎร์อุทิศ 11.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0032ถนนสายราษฎร์อุทิศ 11.jpg', 'image', NULL, '3ad918a0-be11-4589-a27c-c9d0c0d360ed', '2026-03-30 19:20:00.695', NULL, NULL, NULL, NULL, 898);
INSERT INTO "public"."Uploads" VALUES (276, 'ตง.ถ.2-0032ถนนสายราษฎร์อุทิศ 12.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0032ถนนสายราษฎร์อุทิศ 12.jpg', 'image', NULL, 'aaed1921-1bad-4da0-a8df-3bf05a6bd5aa', '2026-03-30 19:20:00.695', NULL, NULL, NULL, NULL, 898);
INSERT INTO "public"."Uploads" VALUES (277, 'ตง.ถ.2-0032ถนนสายราษฎร์อุทิศ 13.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0032ถนนสายราษฎร์อุทิศ 13.jpg', 'image', NULL, 'fbaff596-f20d-4a7a-a361-285f4549e552', '2026-03-30 19:20:00.696', NULL, NULL, NULL, NULL, 898);
INSERT INTO "public"."Uploads" VALUES (278, 'ตง.ถ.2-0032ถนนสายราษฎร์อุทิศ 14.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0032ถนนสายราษฎร์อุทิศ 14.jpg', 'image', NULL, '26f738f9-dc1e-48cb-a2a3-06003332d095', '2026-03-30 19:20:00.696', NULL, NULL, NULL, NULL, 898);
INSERT INTO "public"."Uploads" VALUES (279, 'ตง.ถ.2-0032ถนนสายราษฎร์อุทิศ 15.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0032ถนนสายราษฎร์อุทิศ 15.jpg', 'image', NULL, 'f89ea552-6b85-457f-adc0-fe4b86f0777f', '2026-03-30 19:20:00.698', NULL, NULL, NULL, NULL, 898);
INSERT INTO "public"."Uploads" VALUES (280, 'ตง.ถ.2-0032ถนนสายราษฎร์อุทิศ 16.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0032ถนนสายราษฎร์อุทิศ 16.jpg', 'image', NULL, '51a91a3e-1175-4002-bce3-bb32d406891a', '2026-03-30 19:20:00.699', NULL, NULL, NULL, NULL, 898);
INSERT INTO "public"."Uploads" VALUES (281, 'ตง.ถ.2-0033ถนนสายราษฎร์อุทิศ 21.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0033ถนนสายราษฎร์อุทิศ 21.jpg', 'image', NULL, '2ce47e9a-3499-4790-aeac-e4982edc5dd1', '2026-03-30 19:20:00.7', NULL, NULL, NULL, NULL, 899);
INSERT INTO "public"."Uploads" VALUES (282, 'ตง.ถ.2-0033ถนนสายราษฎร์อุทิศ 22.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0033ถนนสายราษฎร์อุทิศ 22.jpg', 'image', NULL, 'fb7581ba-7359-45df-9f68-ef9f5132feb0', '2026-03-30 19:20:00.7', NULL, NULL, NULL, NULL, 899);
INSERT INTO "public"."Uploads" VALUES (283, 'ตง.ถ.2-0033ถนนสายราษฎร์อุทิศ 23.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0033ถนนสายราษฎร์อุทิศ 23.jpg', 'image', NULL, '0c748013-60d8-4eba-a858-9c979756318f', '2026-03-30 19:20:00.701', NULL, NULL, NULL, NULL, 899);
INSERT INTO "public"."Uploads" VALUES (284, 'ตง.ถ.2-0033ถนนสายราษฎร์อุทิศ 24.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0033ถนนสายราษฎร์อุทิศ 24.jpg', 'image', NULL, '10639a0e-a2bd-487c-a37e-1f0b04e1b629', '2026-03-30 19:20:00.701', NULL, NULL, NULL, NULL, 899);
INSERT INTO "public"."Uploads" VALUES (285, 'ตง.ถ.2-0033ถนนสายราษฎร์อุทิศ 25.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0033ถนนสายราษฎร์อุทิศ 25.jpg', 'image', NULL, '35bfb618-7664-4042-89e7-c3ccd22f2d7b', '2026-03-30 19:20:00.702', NULL, NULL, NULL, NULL, 899);
INSERT INTO "public"."Uploads" VALUES (286, 'ตง.ถ.2-0033ถนนสายราษฎร์อุทิศ 26.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0033ถนนสายราษฎร์อุทิศ 26.jpg', 'image', NULL, '53621cee-2350-4f76-8b14-48208c837d39', '2026-03-30 19:20:00.703', NULL, NULL, NULL, NULL, 899);
INSERT INTO "public"."Uploads" VALUES (287, 'ตง.ถ.2-0034 ถนนสายราษฎร์อุทิศ 31.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0034 ถนนสายราษฎร์อุทิศ 31.jpg', 'image', NULL, '343d323f-f28e-4f47-b105-871ffb1537b6', '2026-03-30 19:20:00.704', NULL, NULL, NULL, NULL, 900);
INSERT INTO "public"."Uploads" VALUES (288, 'ตง.ถ.2-0034 ถนนสายราษฎร์อุทิศ 32.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0034 ถนนสายราษฎร์อุทิศ 32.jpg', 'image', NULL, 'b28e432a-5b77-4174-8125-235b208f3d86', '2026-03-30 19:20:00.704', NULL, NULL, NULL, NULL, 900);
INSERT INTO "public"."Uploads" VALUES (289, 'ตง.ถ.2-0034 ถนนสายราษฎร์อุทิศ 33.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0034 ถนนสายราษฎร์อุทิศ 33.jpg', 'image', NULL, '7284fdd6-a5e0-4d52-9e7b-c3f327e54410', '2026-03-30 19:20:00.705', NULL, NULL, NULL, NULL, 900);
INSERT INTO "public"."Uploads" VALUES (290, 'ตง.ถ.2-0034 ถนนสายราษฎร์อุทิศ 34.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0034 ถนนสายราษฎร์อุทิศ 34.jpg', 'image', NULL, 'ccd4a262-f78e-41dc-93dc-c53df09526bf', '2026-03-30 19:20:00.705', NULL, NULL, NULL, NULL, 900);
INSERT INTO "public"."Uploads" VALUES (291, 'ตง.ถ.2-0034 ถนนสายราษฎร์อุทิศ 35.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0034 ถนนสายราษฎร์อุทิศ 35.jpg', 'image', NULL, 'ef164ca9-47b4-4f17-bded-5660875117ca', '2026-03-30 19:20:00.705', NULL, NULL, NULL, NULL, 900);
INSERT INTO "public"."Uploads" VALUES (292, 'ตง.ถ.2-0034 ถนนสายราษฎร์อุทิศ 36.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0034 ถนนสายราษฎร์อุทิศ 36.jpg', 'image', NULL, '2795b149-2f37-493f-b992-c74541d731ed', '2026-03-30 19:20:00.706', NULL, NULL, NULL, NULL, 900);
INSERT INTO "public"."Uploads" VALUES (344, 'ตง.ถ.2-0043 ถนนกันตังซอย 65.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0043 ถนนกันตังซอย 65.jpg', 'image', NULL, '3bae9522-0ddd-4078-aa66-67e88772044a', '2026-03-30 19:20:00.742', NULL, NULL, NULL, NULL, 907);
INSERT INTO "public"."Uploads" VALUES (345, 'ตง.ถ.2-0043 ถนนกันตังซอย 66.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0043 ถนนกันตังซอย 66.jpg', 'image', NULL, 'd6d1ea6d-737d-4b6b-8035-0705ce7769d0', '2026-03-30 19:20:00.742', NULL, NULL, NULL, NULL, 907);
INSERT INTO "public"."Uploads" VALUES (299, 'ตง.ถ.2-0036 ถนนสายโคกขัน1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0036 ถนนสายโคกขัน1.jpg', 'image', NULL, '94dc2a10-a45a-4047-932d-6be047c0e7a5', '2026-03-30 19:20:00.714', NULL, NULL, NULL, NULL, 902);
INSERT INTO "public"."Uploads" VALUES (300, 'ตง.ถ.2-0036 ถนนสายโคกขัน2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0036 ถนนสายโคกขัน2.jpg', 'image', NULL, '24f744cc-3678-4698-a087-719fafa515b0', '2026-03-30 19:20:00.715', NULL, NULL, NULL, NULL, 902);
INSERT INTO "public"."Uploads" VALUES (301, 'ตง.ถ.2-0036 ถนนสายโคกขัน3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0036 ถนนสายโคกขัน3.jpg', 'image', NULL, '18a70e39-a584-487d-9086-53813cecfbec', '2026-03-30 19:20:00.716', NULL, NULL, NULL, NULL, 902);
INSERT INTO "public"."Uploads" VALUES (302, 'ตง.ถ.2-0036 ถนนสายโคกขัน4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0036 ถนนสายโคกขัน4.jpg', 'image', NULL, 'f1a4dce4-6de1-4cde-afac-dc3bbb3591e7', '2026-03-30 19:20:00.717', NULL, NULL, NULL, NULL, 902);
INSERT INTO "public"."Uploads" VALUES (303, 'ตง.ถ.2-0036 ถนนสายโคกขัน5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0036 ถนนสายโคกขัน5.jpg', 'image', NULL, '5b92af6f-d590-4d71-bb7a-0b3b191cb002', '2026-03-30 19:20:00.717', NULL, NULL, NULL, NULL, 902);
INSERT INTO "public"."Uploads" VALUES (304, 'ตง.ถ.2-0036 ถนนสายโคกขัน6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0036 ถนนสายโคกขัน6.jpg', 'image', NULL, '2ae71a30-3ed3-43df-9a57-d7110079fba4', '2026-03-30 19:20:00.718', NULL, NULL, NULL, NULL, 902);
INSERT INTO "public"."Uploads" VALUES (305, 'ตง.ถ.2-0037 ถนนขนานทางรถไฟ(ใต้)1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0037 ถนนขนานทางรถไฟ(ใต้)1.jpg', 'image', NULL, 'a5016caa-1b8c-48ad-b82e-75416ce14e2d', '2026-03-30 19:20:00.718', NULL, NULL, NULL, NULL, 903);
INSERT INTO "public"."Uploads" VALUES (306, 'ตง.ถ.2-0037 ถนนขนานทางรถไฟ(ใต้)2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0037 ถนนขนานทางรถไฟ(ใต้)2.jpg', 'image', NULL, 'db0e8c33-ec1e-4db9-826b-e37541ce653d', '2026-03-30 19:20:00.719', NULL, NULL, NULL, NULL, 903);
INSERT INTO "public"."Uploads" VALUES (307, 'ตง.ถ.2-0037 ถนนขนานทางรถไฟ(ใต้)3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0037 ถนนขนานทางรถไฟ(ใต้)3.jpg', 'image', NULL, 'e6eb6baa-4e85-4bf0-9ad7-9923a6f6191c', '2026-03-30 19:20:00.719', NULL, NULL, NULL, NULL, 903);
INSERT INTO "public"."Uploads" VALUES (308, 'ตง.ถ.2-0037 ถนนขนานทางรถไฟ(ใต้)4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0037 ถนนขนานทางรถไฟ(ใต้)4.jpg', 'image', NULL, 'feee8398-01b5-4b45-8fa0-845304d7a10e', '2026-03-30 19:20:00.72', NULL, NULL, NULL, NULL, 903);
INSERT INTO "public"."Uploads" VALUES (309, 'ตง.ถ.2-0037 ถนนขนานทางรถไฟ(ใต้)5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0037 ถนนขนานทางรถไฟ(ใต้)5.jpg', 'image', NULL, 'dbc0ed16-445e-46ff-8795-2922ae7faebf', '2026-03-30 19:20:00.72', NULL, NULL, NULL, NULL, 903);
INSERT INTO "public"."Uploads" VALUES (310, 'ตง.ถ.2-0037 ถนนขนานทางรถไฟ(ใต้)6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0037 ถนนขนานทางรถไฟ(ใต้)6.jpg', 'image', NULL, '50d8c069-c727-459c-8902-f51bde104a17', '2026-03-30 19:20:00.721', NULL, NULL, NULL, NULL, 903);
INSERT INTO "public"."Uploads" VALUES (311, 'ตง.ถ.2-0037 ถนนขนานทางรถไฟ(ใต้)7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0037 ถนนขนานทางรถไฟ(ใต้)7.jpg', 'image', NULL, '41c78180-8d15-44a2-9f63-f7e614e4d9ac', '2026-03-30 19:20:00.721', NULL, NULL, NULL, NULL, 903);
INSERT INTO "public"."Uploads" VALUES (312, 'ตง.ถ.2-0039 ถนนสายบ้านโพธิ์1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0039 ถนนสายบ้านโพธิ์1.jpg', 'image', NULL, 'a5880cd7-a55e-49ed-a561-7137adf88775', '2026-03-30 19:20:00.722', NULL, NULL, NULL, NULL, 904);
INSERT INTO "public"."Uploads" VALUES (313, 'ตง.ถ.2-0039 ถนนสายบ้านโพธิ์2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0039 ถนนสายบ้านโพธิ์2.jpg', 'image', NULL, '31de5c5a-abcb-430e-9a67-1f78dc358063', '2026-03-30 19:20:00.723', NULL, NULL, NULL, NULL, 904);
INSERT INTO "public"."Uploads" VALUES (314, 'ตง.ถ.2-0039 ถนนสายบ้านโพธิ์3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0039 ถนนสายบ้านโพธิ์3.jpg', 'image', NULL, '1ce26b7c-04a7-4de7-a6ba-1b78a82a61ab', '2026-03-30 19:20:00.723', NULL, NULL, NULL, NULL, 904);
INSERT INTO "public"."Uploads" VALUES (315, 'ตง.ถ.2-0039 ถนนสายบ้านโพธิ์4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0039 ถนนสายบ้านโพธิ์4.jpg', 'image', NULL, '0476de0f-48fe-4dfa-8a83-a8690150180f', '2026-03-30 19:20:00.724', NULL, NULL, NULL, NULL, 904);
INSERT INTO "public"."Uploads" VALUES (316, 'ตง.ถ.2-0039 ถนนสายบ้านโพธิ์5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0039 ถนนสายบ้านโพธิ์5.jpg', 'image', NULL, 'd693165d-ad6b-4cd4-9b67-9c079af46246', '2026-03-30 19:20:00.725', NULL, NULL, NULL, NULL, 904);
INSERT INTO "public"."Uploads" VALUES (317, 'ตง.ถ.2-0039 ถนนสายบ้านโพธิ์6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0039 ถนนสายบ้านโพธิ์6.jpg', 'image', NULL, 'da3e671c-4434-4a07-9f0f-2a3a5f065902', '2026-03-30 19:20:00.725', NULL, NULL, NULL, NULL, 904);
INSERT INTO "public"."Uploads" VALUES (318, 'ตง.ถ.2-0039 ถนนสายบ้านโพธิ์7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0039 ถนนสายบ้านโพธิ์7.jpg', 'image', NULL, '51772d70-0723-43a5-b655-efb54594a0a7', '2026-03-30 19:20:00.726', NULL, NULL, NULL, NULL, 904);
INSERT INTO "public"."Uploads" VALUES (319, 'ตง.ถ.2-0040 ถนนกันตังซอย 11.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0040 ถนนกันตังซอย 11.jpg', 'image', NULL, '035c4645-cd5d-48a9-bb7b-23eceb00a5a8', '2026-03-30 19:20:00.726', NULL, NULL, NULL, NULL, 905);
INSERT INTO "public"."Uploads" VALUES (320, 'ตง.ถ.2-0040 ถนนกันตังซอย 12.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0040 ถนนกันตังซอย 12.jpg', 'image', NULL, '4b0d6353-cbda-4484-a494-c6e0f6a7de2c', '2026-03-30 19:20:00.727', NULL, NULL, NULL, NULL, 905);
INSERT INTO "public"."Uploads" VALUES (346, 'ตง.ถ.2-0043 ถนนกันตังซอย 67.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0043 ถนนกันตังซอย 67.jpg', 'image', NULL, '851a2c6b-0ffd-4c71-8c45-e3c21c4056bc', '2026-03-30 19:20:00.743', NULL, NULL, NULL, NULL, 907);
INSERT INTO "public"."Uploads" VALUES (321, 'ตง.ถ.2-0040 ถนนกันตังซอย 13.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0040 ถนนกันตังซอย 13.jpg', 'image', NULL, 'ae5b4132-5c4b-4f8a-85e7-c144e98a2e1e', '2026-03-30 19:20:00.727', NULL, NULL, NULL, NULL, 905);
INSERT INTO "public"."Uploads" VALUES (322, 'ตง.ถ.2-0040 ถนนกันตังซอย 14.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0040 ถนนกันตังซอย 14.jpg', 'image', NULL, '5a83050c-2614-4bf0-900b-78d6c239ad61', '2026-03-30 19:20:00.728', NULL, NULL, NULL, NULL, 905);
INSERT INTO "public"."Uploads" VALUES (323, 'ตง.ถ.2-0040 ถนนกันตังซอย 15.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0040 ถนนกันตังซอย 15.jpg', 'image', NULL, '332664f0-be16-43c7-ac56-7efa0f40008a', '2026-03-30 19:20:00.728', NULL, NULL, NULL, NULL, 905);
INSERT INTO "public"."Uploads" VALUES (324, 'ตง.ถ.2-0040 ถนนกันตังซอย 16.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0040 ถนนกันตังซอย 16.jpg', 'image', NULL, '37055882-d03a-4514-8f16-194895921da1', '2026-03-30 19:20:00.729', NULL, NULL, NULL, NULL, 905);
INSERT INTO "public"."Uploads" VALUES (325, 'ตง.ถ.2-0040 ถนนกันตังซอย 17.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0040 ถนนกันตังซอย 17.jpg', 'image', NULL, 'a0354ea2-7a57-4dd4-a5a8-f6b154b2d008', '2026-03-30 19:20:00.73', NULL, NULL, NULL, NULL, 905);
INSERT INTO "public"."Uploads" VALUES (376, 'ตง.ถ.2-0048 ถนนกันตังซอย 112.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0048 ถนนกันตังซอย 112.jpg', 'image', NULL, '7d2793ab-d6f3-4de9-a460-ce991bc0443e', '2026-03-30 19:20:00.761', NULL, NULL, NULL, NULL, 912);
INSERT INTO "public"."Uploads" VALUES (377, 'ตง.ถ.2-0048 ถนนกันตังซอย 113.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0048 ถนนกันตังซอย 113.jpg', 'image', NULL, 'f22e18f6-e6fa-4cb2-a342-148216462ca2', '2026-03-30 19:20:00.761', NULL, NULL, NULL, NULL, 912);
INSERT INTO "public"."Uploads" VALUES (378, 'ตง.ถ.2-0048 ถนนกันตังซอย 114.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0048 ถนนกันตังซอย 114.jpg', 'image', NULL, 'a298ef4f-49b9-4f1d-bfd7-c5dd4351548d', '2026-03-30 19:20:00.762', NULL, NULL, NULL, NULL, 912);
INSERT INTO "public"."Uploads" VALUES (379, 'ตง.ถ.2-0048 ถนนกันตังซอย 115.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0048 ถนนกันตังซอย 115.jpg', 'image', NULL, '1c45f1f5-4f51-4c1d-8062-6f347d74f2d8', '2026-03-30 19:20:00.762', NULL, NULL, NULL, NULL, 912);
INSERT INTO "public"."Uploads" VALUES (380, 'ตง.ถ.2-0048 ถนนกันตังซอย 116.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0048 ถนนกันตังซอย 116.jpg', 'image', NULL, '404fc1c3-fab5-4ba1-a8d4-a3fb56091f8d', '2026-03-30 19:20:00.763', NULL, NULL, NULL, NULL, 912);
INSERT INTO "public"."Uploads" VALUES (381, 'ตง.ถ.2-0048 ถนนกันตังซอย 117.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0048 ถนนกันตังซอย 117.jpg', 'image', NULL, '4c712af6-0999-4240-a356-05f8e23b3d92', '2026-03-30 19:20:00.764', NULL, NULL, NULL, NULL, 912);
INSERT INTO "public"."Uploads" VALUES (382, 'ตง.ถ.2-0049 ถนนกันตังซอย 12 (ซอยสินไชย)1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0049 ถนนกันตังซอย 12 (ซอยสินไชย)1.jpg', 'image', NULL, '459ab332-37af-449d-af8b-87409bb0cd65', '2026-03-30 19:20:00.764', NULL, NULL, NULL, NULL, 913);
INSERT INTO "public"."Uploads" VALUES (383, 'ตง.ถ.2-0049 ถนนกันตังซอย 12 (ซอยสินไชย)2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0049 ถนนกันตังซอย 12 (ซอยสินไชย)2.jpg', 'image', NULL, '0128f1ba-ae72-4ede-92d7-ec74e24c59ee', '2026-03-30 19:20:00.765', NULL, NULL, NULL, NULL, 913);
INSERT INTO "public"."Uploads" VALUES (384, 'ตง.ถ.2-0049 ถนนกันตังซอย 12 (ซอยสินไชย)3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0049 ถนนกันตังซอย 12 (ซอยสินไชย)3.jpg', 'image', NULL, 'a0a35a8c-f993-45f6-be2e-ceb49b382332', '2026-03-30 19:20:00.766', NULL, NULL, NULL, NULL, 913);
INSERT INTO "public"."Uploads" VALUES (385, 'ตง.ถ.2-0049 ถนนกันตังซอย 12 (ซอยสินไชย)4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0049 ถนนกันตังซอย 12 (ซอยสินไชย)4.jpg', 'image', NULL, '371785e1-617b-433e-a863-2cdcc39c8a50', '2026-03-30 19:20:00.766', NULL, NULL, NULL, NULL, 913);
INSERT INTO "public"."Uploads" VALUES (386, 'ตง.ถ.2-0049 ถนนกันตังซอย 12 (ซอยสินไชย)5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0049 ถนนกันตังซอย 12 (ซอยสินไชย)5.jpg', 'image', NULL, '70589e1a-79ec-420e-8c4a-9e098010b552', '2026-03-30 19:20:00.767', NULL, NULL, NULL, NULL, 913);
INSERT INTO "public"."Uploads" VALUES (387, 'ตง.ถ.2-0049 ถนนกันตังซอย 12 (ซอยสินไชย)6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0049 ถนนกันตังซอย 12 (ซอยสินไชย)6.jpg', 'image', NULL, '047a3a54-68b6-42af-82b1-35e9816c6382', '2026-03-30 19:20:00.767', NULL, NULL, NULL, NULL, 913);
INSERT INTO "public"."Uploads" VALUES (388, 'ตง.ถ.2-0049 ถนนกันตังซอย 12 (ซอยสินไชย)7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0049 ถนนกันตังซอย 12 (ซอยสินไชย)7.jpg', 'image', NULL, '357104f1-6da1-4215-941b-e7059ed06879', '2026-03-30 19:20:00.768', NULL, NULL, NULL, NULL, 913);
INSERT INTO "public"."Uploads" VALUES (389, 'ตง.ถ.2-0050 ถนนกันตังซอย 131.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0050 ถนนกันตังซอย 131.jpg', 'image', NULL, 'ae7888f4-76bd-453b-832a-c2f6c379e9d8', '2026-03-30 19:20:00.768', NULL, NULL, NULL, NULL, 914);
INSERT INTO "public"."Uploads" VALUES (390, 'ตง.ถ.2-0050 ถนนกันตังซอย 132.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0050 ถนนกันตังซอย 132.jpg', 'image', NULL, '9b10af02-f734-46a0-9a4a-b77d02ba03fc', '2026-03-30 19:20:00.769', NULL, NULL, NULL, NULL, 914);
INSERT INTO "public"."Uploads" VALUES (391, 'ตง.ถ.2-0050 ถนนกันตังซอย 133.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0050 ถนนกันตังซอย 133.jpg', 'image', NULL, '31772f6a-4d5a-44ac-8213-fd55b508623a', '2026-03-30 19:20:00.769', NULL, NULL, NULL, NULL, 914);
INSERT INTO "public"."Uploads" VALUES (392, 'ตง.ถ.2-0050 ถนนกันตังซอย 134.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0050 ถนนกันตังซอย 134.jpg', 'image', NULL, '2469a657-5c5b-4582-b907-4de4472cc012', '2026-03-30 19:20:00.769', NULL, NULL, NULL, NULL, 914);
INSERT INTO "public"."Uploads" VALUES (393, 'ตง.ถ.2-0050 ถนนกันตังซอย 135.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0050 ถนนกันตังซอย 135.jpg', 'image', NULL, '7f1de72a-5a44-4d8b-8002-7ba7cb4ef6dc', '2026-03-30 19:20:00.77', NULL, NULL, NULL, NULL, 914);
INSERT INTO "public"."Uploads" VALUES (394, 'ตง.ถ.2-0050 ถนนกันตังซอย 136.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0050 ถนนกันตังซอย 136.jpg', 'image', NULL, '0e5e70a6-2367-4e7b-af55-c98cb4a24b63', '2026-03-30 19:20:00.771', NULL, NULL, NULL, NULL, 914);
INSERT INTO "public"."Uploads" VALUES (395, 'ตง.ถ.2-0050 ถนนกันตังซอย 137.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0050 ถนนกันตังซอย 137.jpg', 'image', NULL, 'a3490cbd-2f1d-4dad-9b1a-86f608962ce4', '2026-03-30 19:20:00.772', NULL, NULL, NULL, NULL, 914);
INSERT INTO "public"."Uploads" VALUES (396, 'ตง.ถ.2-0051 ถนนกันตังซอย 141.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0051 ถนนกันตังซอย 141.jpg', 'image', NULL, '9c9a2528-110f-41b4-9c74-25a01749e375', '2026-03-30 19:20:00.773', NULL, NULL, NULL, NULL, 915);
INSERT INTO "public"."Uploads" VALUES (397, 'ตง.ถ.2-0051 ถนนกันตังซอย 142.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0051 ถนนกันตังซอย 142.jpg', 'image', NULL, 'ba0de53d-76e0-4697-a3c9-600cc85481b6', '2026-03-30 19:20:00.773', NULL, NULL, NULL, NULL, 915);
INSERT INTO "public"."Uploads" VALUES (398, 'ตง.ถ.2-0051 ถนนกันตังซอย 143.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0051 ถนนกันตังซอย 143.jpg', 'image', NULL, '39ba863a-6dc2-43ed-bb47-2bc49567470f', '2026-03-30 19:20:00.774', NULL, NULL, NULL, NULL, 915);
INSERT INTO "public"."Uploads" VALUES (347, 'ตง.ถ.2-0044 ถนนกันตังซอย 71.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0044 ถนนกันตังซอย 71.jpg', 'image', NULL, '9a86668c-48ef-41e2-acaf-0c4bd1801961', '2026-03-30 19:20:00.744', NULL, NULL, NULL, NULL, 908);
INSERT INTO "public"."Uploads" VALUES (399, 'ตง.ถ.2-0051 ถนนกันตังซอย 144.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0051 ถนนกันตังซอย 144.jpg', 'image', NULL, '0a529b6f-ac8f-4253-9740-e441549ec4ba', '2026-03-30 19:20:00.774', NULL, NULL, NULL, NULL, 915);
INSERT INTO "public"."Uploads" VALUES (400, 'ตง.ถ.2-0051 ถนนกันตังซอย 145.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0051 ถนนกันตังซอย 145.jpg', 'image', NULL, '68256444-237a-421b-8e41-385f23ab53b9', '2026-03-30 19:20:00.775', NULL, NULL, NULL, NULL, 915);
INSERT INTO "public"."Uploads" VALUES (401, 'ตง.ถ.2-0051 ถนนกันตังซอย 146.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0051 ถนนกันตังซอย 146.jpg', 'image', NULL, '463e2b51-c40b-4656-8956-7d04d776fb4b', '2026-03-30 19:20:00.775', NULL, NULL, NULL, NULL, 915);
INSERT INTO "public"."Uploads" VALUES (402, 'ตง.ถ.2-0051 ถนนกันตังซอย 147.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0051 ถนนกันตังซอย 147.jpg', 'image', NULL, 'f0686490-ae2d-45d4-ab48-b932e25944ff', '2026-03-30 19:20:00.776', NULL, NULL, NULL, NULL, 915);
INSERT INTO "public"."Uploads" VALUES (403, 'ตง.ถ.2-0052 ถนนกันตังซอย 151.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0052 ถนนกันตังซอย 151.jpg', 'image', NULL, '7592be56-82ec-4b83-af5b-3f16e5f4d513', '2026-03-30 19:20:00.776', NULL, NULL, NULL, NULL, 916);
INSERT INTO "public"."Uploads" VALUES (404, 'ตง.ถ.2-0052 ถนนกันตังซอย 152.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0052 ถนนกันตังซอย 152.jpg', 'image', NULL, '7b738b71-6101-4cb2-92ef-22f5b57b95ec', '2026-03-30 19:20:00.777', NULL, NULL, NULL, NULL, 916);
INSERT INTO "public"."Uploads" VALUES (405, 'ตง.ถ.2-0052 ถนนกันตังซอย 153.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0052 ถนนกันตังซอย 153.jpg', 'image', NULL, '98db19a6-68ec-42fa-8e4d-3abff94db83a', '2026-03-30 19:20:00.777', NULL, NULL, NULL, NULL, 916);
INSERT INTO "public"."Uploads" VALUES (406, 'ตง.ถ.2-0052 ถนนกันตังซอย 154.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0052 ถนนกันตังซอย 154.jpg', 'image', NULL, '1decdd44-6eb8-4d8f-a12c-4ca1f3ce136c', '2026-03-30 19:20:00.778', NULL, NULL, NULL, NULL, 916);
INSERT INTO "public"."Uploads" VALUES (407, 'ตง.ถ.2-0052 ถนนกันตังซอย 155.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0052 ถนนกันตังซอย 155.jpg', 'image', NULL, '5db7a023-cae2-49ec-84c2-0265894544ee', '2026-03-30 19:20:00.779', NULL, NULL, NULL, NULL, 916);
INSERT INTO "public"."Uploads" VALUES (408, 'ตง.ถ.2-0052 ถนนกันตังซอย 156.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0052 ถนนกันตังซอย 156.jpg', 'image', NULL, '5192e0e6-74ca-4f76-8f4f-890768c621c5', '2026-03-30 19:20:00.779', NULL, NULL, NULL, NULL, 916);
INSERT INTO "public"."Uploads" VALUES (409, 'ตง.ถ.2-0052 ถนนกันตังซอย 157.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0052 ถนนกันตังซอย 157.jpg', 'image', NULL, '79614fee-04ef-4a65-b137-c952f77a8b79', '2026-03-30 19:20:00.78', NULL, NULL, NULL, NULL, 916);
INSERT INTO "public"."Uploads" VALUES (410, 'ตง.ถ.2-0053 ถนนกันตังซอย 161.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0053 ถนนกันตังซอย 161.jpg', 'image', NULL, '71bcf549-f45b-4dd5-9e48-cd4d7cf076bc', '2026-03-30 19:20:00.78', NULL, NULL, NULL, NULL, 917);
INSERT INTO "public"."Uploads" VALUES (411, 'ตง.ถ.2-0053 ถนนกันตังซอย 162.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0053 ถนนกันตังซอย 162.jpg', 'image', NULL, '868d16ef-2f80-4ce5-aea0-2433bba5e55c', '2026-03-30 19:20:00.781', NULL, NULL, NULL, NULL, 917);
INSERT INTO "public"."Uploads" VALUES (412, 'ตง.ถ.2-0053 ถนนกันตังซอย 163.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0053 ถนนกันตังซอย 163.jpg', 'image', NULL, '03c6c67e-f3ca-4fd4-b361-69ec2b5ffa03', '2026-03-30 19:20:00.781', NULL, NULL, NULL, NULL, 917);
INSERT INTO "public"."Uploads" VALUES (413, 'ตง.ถ.2-0053 ถนนกันตังซอย 164.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0053 ถนนกันตังซอย 164.jpg', 'image', NULL, 'baf57ba5-c9d3-43c6-840d-c9d6ae2a0800', '2026-03-30 19:20:00.782', NULL, NULL, NULL, NULL, 917);
INSERT INTO "public"."Uploads" VALUES (414, 'ตง.ถ.2-0053 ถนนกันตังซอย 165.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0053 ถนนกันตังซอย 165.jpg', 'image', NULL, '3c79ee23-ef7b-4341-b221-715d99460449', '2026-03-30 19:20:00.782', NULL, NULL, NULL, NULL, 917);
INSERT INTO "public"."Uploads" VALUES (415, 'ตง.ถ.2-0053 ถนนกันตังซอย 166.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0053 ถนนกันตังซอย 166.jpg', 'image', NULL, 'b5231d2f-ccb2-4b79-857b-db493867e9bc', '2026-03-30 19:20:00.782', NULL, NULL, NULL, NULL, 917);
INSERT INTO "public"."Uploads" VALUES (416, 'ตง.ถ.2-0053 ถนนกันตังซอย 167.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0053 ถนนกันตังซอย 167.jpg', 'image', NULL, '74c82feb-07e1-4ce9-b473-52e4f2150fe1', '2026-03-30 19:20:00.783', NULL, NULL, NULL, NULL, 917);
INSERT INTO "public"."Uploads" VALUES (417, 'ตง.ถ.2-0054 ถนนกันตังซอย 181.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0054 ถนนกันตังซอย 181.jpg', 'image', NULL, 'f476647c-9304-456a-95e6-f920c3d3bb5c', '2026-03-30 19:20:00.784', NULL, NULL, NULL, NULL, 918);
INSERT INTO "public"."Uploads" VALUES (418, 'ตง.ถ.2-0054 ถนนกันตังซอย 182.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0054 ถนนกันตังซอย 182.jpg', 'image', NULL, '7b8ce0ab-6e94-45b9-ab84-6fece23813c4', '2026-03-30 19:20:00.785', NULL, NULL, NULL, NULL, 918);
INSERT INTO "public"."Uploads" VALUES (419, 'ตง.ถ.2-0054 ถนนกันตังซอย 183.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0054 ถนนกันตังซอย 183.jpg', 'image', NULL, '813f2ad0-827d-4b3a-925d-5b7576e89d3c', '2026-03-30 19:20:00.785', NULL, NULL, NULL, NULL, 918);
INSERT INTO "public"."Uploads" VALUES (420, 'ตง.ถ.2-0054 ถนนกันตังซอย 184.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0054 ถนนกันตังซอย 184.jpg', 'image', NULL, '871229e2-a0de-48ea-a76d-8f155b6fea27', '2026-03-30 19:20:00.786', NULL, NULL, NULL, NULL, 918);
INSERT INTO "public"."Uploads" VALUES (421, 'ตง.ถ.2-0054 ถนนกันตังซอย 185.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0054 ถนนกันตังซอย 185.jpg', 'image', NULL, 'a5f2b28f-062d-43c3-b5ba-0af4ca907066', '2026-03-30 19:20:00.787', NULL, NULL, NULL, NULL, 918);
INSERT INTO "public"."Uploads" VALUES (422, 'ตง.ถ.2-0054 ถนนกันตังซอย 186.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0054 ถนนกันตังซอย 186.jpg', 'image', NULL, '2b4d0b93-2084-4830-9c0b-edb2236643ca', '2026-03-30 19:20:00.788', NULL, NULL, NULL, NULL, 918);
INSERT INTO "public"."Uploads" VALUES (423, 'ตง.ถ.2-0054 ถนนกันตังซอย 187.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0054 ถนนกันตังซอย 187.jpg', 'image', NULL, '8d3acd4a-0003-4dcf-a0f0-be9c2ab5a537', '2026-03-30 19:20:00.788', NULL, NULL, NULL, NULL, 918);
INSERT INTO "public"."Uploads" VALUES (431, 'ตง.ถ.2-0056 ถนนกันตังซอย 22(สวัสดิ์อุทิศ)1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0056 ถนนกันตังซอย 22(สวัสดิ์อุทิศ)1.jpg', 'image', NULL, '9bf1f851-6576-4418-8661-18a96bef2de9', '2026-03-30 19:20:00.793', NULL, NULL, NULL, NULL, 920);
INSERT INTO "public"."Uploads" VALUES (432, 'ตง.ถ.2-0056 ถนนกันตังซอย 22(สวัสดิ์อุทิศ)2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0056 ถนนกันตังซอย 22(สวัสดิ์อุทิศ)2.jpg', 'image', NULL, '568bddf4-3a7f-4210-a23b-1a6099f20d24', '2026-03-30 19:20:00.793', NULL, NULL, NULL, NULL, 920);
INSERT INTO "public"."Uploads" VALUES (433, 'ตง.ถ.2-0056 ถนนกันตังซอย 22(สวัสดิ์อุทิศ)3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0056 ถนนกันตังซอย 22(สวัสดิ์อุทิศ)3.jpg', 'image', NULL, '19200c6b-4ee7-4c8a-a377-f0e2c4fd1ab9', '2026-03-30 19:20:00.794', NULL, NULL, NULL, NULL, 920);
INSERT INTO "public"."Uploads" VALUES (348, 'ตง.ถ.2-0044 ถนนกันตังซอย 72.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0044 ถนนกันตังซอย 72.jpg', 'image', NULL, '6f782abd-934a-4e7a-9e11-e55608dd8483', '2026-03-30 19:20:00.744', NULL, NULL, NULL, NULL, 908);
INSERT INTO "public"."Uploads" VALUES (349, 'ตง.ถ.2-0044 ถนนกันตังซอย 73.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0044 ถนนกันตังซอย 73.jpg', 'image', NULL, 'd0881245-1998-4105-9e22-3cb9ddf1df3d', '2026-03-30 19:20:00.745', NULL, NULL, NULL, NULL, 908);
INSERT INTO "public"."Uploads" VALUES (350, 'ตง.ถ.2-0044 ถนนกันตังซอย 74.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0044 ถนนกันตังซอย 74.jpg', 'image', NULL, 'c8e710e4-7f4b-416a-acab-31a3c8b1bff6', '2026-03-30 19:20:00.745', NULL, NULL, NULL, NULL, 908);
INSERT INTO "public"."Uploads" VALUES (434, 'ตง.ถ.2-0056 ถนนกันตังซอย 22(สวัสดิ์อุทิศ)4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0056 ถนนกันตังซอย 22(สวัสดิ์อุทิศ)4.jpg', 'image', NULL, '24f7645a-8a53-4807-a7ec-5a300158d6ec', '2026-03-30 19:20:00.794', NULL, NULL, NULL, NULL, 920);
INSERT INTO "public"."Uploads" VALUES (435, 'ตง.ถ.2-0056 ถนนกันตังซอย 22(สวัสดิ์อุทิศ)5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0056 ถนนกันตังซอย 22(สวัสดิ์อุทิศ)5.jpg', 'image', NULL, 'caafaea0-45cc-475b-ab1e-2e612da9a52d', '2026-03-30 19:20:00.795', NULL, NULL, NULL, NULL, 920);
INSERT INTO "public"."Uploads" VALUES (436, 'ตง.ถ.2-0056 ถนนกันตังซอย 22(สวัสดิ์อุทิศ)6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0056 ถนนกันตังซอย 22(สวัสดิ์อุทิศ)6.jpg', 'image', NULL, 'ba7eae2d-83bd-418e-b4d7-d636cded4d27', '2026-03-30 19:20:00.795', NULL, NULL, NULL, NULL, 920);
INSERT INTO "public"."Uploads" VALUES (437, 'ตง.ถ.2-0056 ถนนกันตังซอย 22(สวัสดิ์อุทิศ)7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0056 ถนนกันตังซอย 22(สวัสดิ์อุทิศ)7.jpg', 'image', NULL, '3a32f56e-3c15-4816-befa-a29bce7461c3', '2026-03-30 19:20:00.796', NULL, NULL, NULL, NULL, 920);
INSERT INTO "public"."Uploads" VALUES (438, 'ตง.ถ.2-0057 ถนนกันตังซอย 241.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0057 ถนนกันตังซอย 241.jpg', 'image', NULL, '9c99239b-9457-49af-a818-13f659d78597', '2026-03-30 19:20:00.796', NULL, NULL, NULL, NULL, 921);
INSERT INTO "public"."Uploads" VALUES (439, 'ตง.ถ.2-0057 ถนนกันตังซอย 242.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0057 ถนนกันตังซอย 242.jpg', 'image', NULL, '86c2a056-10d2-4a4c-99a1-0849053fda08', '2026-03-30 19:20:00.797', NULL, NULL, NULL, NULL, 921);
INSERT INTO "public"."Uploads" VALUES (440, 'ตง.ถ.2-0057 ถนนกันตังซอย 243.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0057 ถนนกันตังซอย 243.jpg', 'image', NULL, '40ed3a00-f975-4ff7-98d5-4b5fd91effc1', '2026-03-30 19:20:00.797', NULL, NULL, NULL, NULL, 921);
INSERT INTO "public"."Uploads" VALUES (441, 'ตง.ถ.2-0057 ถนนกันตังซอย 244.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0057 ถนนกันตังซอย 244.jpg', 'image', NULL, '2003e83b-202e-469d-adc3-79330a7efb88', '2026-03-30 19:20:00.798', NULL, NULL, NULL, NULL, 921);
INSERT INTO "public"."Uploads" VALUES (442, 'ตง.ถ.2-0057 ถนนกันตังซอย 245.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0057 ถนนกันตังซอย 245.jpg', 'image', NULL, 'a60d9fdd-de40-4dbb-9af2-afbd757d0fbc', '2026-03-30 19:20:00.799', NULL, NULL, NULL, NULL, 921);
INSERT INTO "public"."Uploads" VALUES (443, 'ตง.ถ.2-0057 ถนนกันตังซอย 246.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0057 ถนนกันตังซอย 246.jpg', 'image', NULL, '38dacd25-1c6f-467f-ba13-0f2fc3074378', '2026-03-30 19:20:00.799', NULL, NULL, NULL, NULL, 921);
INSERT INTO "public"."Uploads" VALUES (444, 'ตง.ถ.2-0057 ถนนกันตังซอย 247.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0057 ถนนกันตังซอย 247.jpg', 'image', NULL, '49769728-1fac-4acf-a825-8041e54668ef', '2026-03-30 19:20:00.8', NULL, NULL, NULL, NULL, 921);
INSERT INTO "public"."Uploads" VALUES (445, 'ตง.ถ.2-0058 ถนนกันตังซอย 261.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0058 ถนนกันตังซอย 261.jpg', 'image', NULL, '56d66c80-58c1-4429-8f97-79a4c5f681c3', '2026-03-30 19:20:00.801', NULL, NULL, NULL, NULL, 922);
INSERT INTO "public"."Uploads" VALUES (446, 'ตง.ถ.2-0058 ถนนกันตังซอย 262.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0058 ถนนกันตังซอย 262.jpg', 'image', NULL, 'e6e079e8-5ffd-4c4d-9a29-7e69870eca3b', '2026-03-30 19:20:00.801', NULL, NULL, NULL, NULL, 922);
INSERT INTO "public"."Uploads" VALUES (447, 'ตง.ถ.2-0058 ถนนกันตังซอย 263.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0058 ถนนกันตังซอย 263.jpg', 'image', NULL, '2a8aa765-0965-4cef-be70-e204a5be0577', '2026-03-30 19:20:00.802', NULL, NULL, NULL, NULL, 922);
INSERT INTO "public"."Uploads" VALUES (448, 'ตง.ถ.2-0058 ถนนกันตังซอย 264.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0058 ถนนกันตังซอย 264.jpg', 'image', NULL, 'e2fa3fe4-ba7e-4cab-9147-3c935779eda7', '2026-03-30 19:20:00.802', NULL, NULL, NULL, NULL, 922);
INSERT INTO "public"."Uploads" VALUES (449, 'ตง.ถ.2-0058 ถนนกันตังซอย 265.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0058 ถนนกันตังซอย 265.jpg', 'image', NULL, 'b4f49562-50a6-42c8-8f82-7e1337e7d67d', '2026-03-30 19:20:00.803', NULL, NULL, NULL, NULL, 922);
INSERT INTO "public"."Uploads" VALUES (450, 'ตง.ถ.2-0058 ถนนกันตังซอย 266.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0058 ถนนกันตังซอย 266.jpg', 'image', NULL, 'bec08978-0910-4aed-9e0c-a1f09d893bce', '2026-03-30 19:20:00.803', NULL, NULL, NULL, NULL, 922);
INSERT INTO "public"."Uploads" VALUES (451, 'ตง.ถ.2-0058 ถนนกันตังซอย 267.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0058 ถนนกันตังซอย 267.jpg', 'image', NULL, '83c3a7fe-6ef3-4617-bc6b-2d5fecdb7f02', '2026-03-30 19:20:00.804', NULL, NULL, NULL, NULL, 922);
INSERT INTO "public"."Uploads" VALUES (452, 'ตง.ถ.2-0058 ถนนกันตังซอย 268.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0058 ถนนกันตังซอย 268.jpg', 'image', NULL, '4df750a2-b9c0-4b14-85a1-aa407652581b', '2026-03-30 19:20:00.804', NULL, NULL, NULL, NULL, 922);
INSERT INTO "public"."Uploads" VALUES (453, 'ตง.ถ.2-0059 ถนนห้วยยอด ซอย 21.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0059 ถนนห้วยยอด ซอย 21.jpg', 'image', NULL, '6a98473a-aa25-4e4e-a7ea-cd52b32f9c69', '2026-03-30 19:20:00.805', NULL, NULL, NULL, NULL, 923);
INSERT INTO "public"."Uploads" VALUES (454, 'ตง.ถ.2-0059 ถนนห้วยยอด ซอย 22.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0059 ถนนห้วยยอด ซอย 22.jpg', 'image', NULL, 'd41387aa-f86f-4bff-b522-adbe8a36ecdd', '2026-03-30 19:20:00.806', NULL, NULL, NULL, NULL, 923);
INSERT INTO "public"."Uploads" VALUES (455, 'ตง.ถ.2-0059 ถนนห้วยยอด ซอย 23.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0059 ถนนห้วยยอด ซอย 23.jpg', 'image', NULL, '1bdaee3b-9487-4be0-b054-51a3d9285978', '2026-03-30 19:20:00.806', NULL, NULL, NULL, NULL, 923);
INSERT INTO "public"."Uploads" VALUES (456, 'ตง.ถ.2-0059 ถนนห้วยยอด ซอย 24.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0059 ถนนห้วยยอด ซอย 24.jpg', 'image', NULL, '02113787-62e0-48a4-a314-a10af65d7b22', '2026-03-30 19:20:00.807', NULL, NULL, NULL, NULL, 923);
INSERT INTO "public"."Uploads" VALUES (457, 'ตง.ถ.2-0059 ถนนห้วยยอด ซอย 25.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0059 ถนนห้วยยอด ซอย 25.jpg', 'image', NULL, '955aac08-92d1-4533-be09-b99cf42216e4', '2026-03-30 19:20:00.808', NULL, NULL, NULL, NULL, 923);
INSERT INTO "public"."Uploads" VALUES (458, 'ตง.ถ.2-0059 ถนนห้วยยอด ซอย 26.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0059 ถนนห้วยยอด ซอย 26.jpg', 'image', NULL, '3d8181d5-7cbc-4626-821a-da587e7cecd1', '2026-03-30 19:20:00.808', NULL, NULL, NULL, NULL, 923);
INSERT INTO "public"."Uploads" VALUES (459, 'ตง.ถ.2-0059 ถนนห้วยยอด ซอย 27.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0059 ถนนห้วยยอด ซอย 27.jpg', 'image', NULL, '7c3a4ff2-f2e1-4ec2-997a-36cdeebd3cb7', '2026-03-30 19:20:00.809', NULL, NULL, NULL, NULL, 923);
INSERT INTO "public"."Uploads" VALUES (461, 'ตง.ถ.2-0060 ถนนห้วยยอด ซอย 32.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0060 ถนนห้วยยอด ซอย 32.jpg', 'image', NULL, '734c6517-aa9d-4877-b42e-509563552436', '2026-03-30 19:20:00.81', NULL, NULL, NULL, NULL, 924);
INSERT INTO "public"."Uploads" VALUES (460, 'ตง.ถ.2-0060 ถนนห้วยยอด ซอย 31.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0060 ถนนห้วยยอด ซอย 31.jpg', 'image', NULL, '9ca9b23e-fe86-4553-a253-93d571013c55', '2026-03-30 19:20:00.809', NULL, NULL, NULL, NULL, 924);
INSERT INTO "public"."Uploads" VALUES (462, 'ตง.ถ.2-0060 ถนนห้วยยอด ซอย 33.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0060 ถนนห้วยยอด ซอย 33.jpg', 'image', NULL, 'a4727996-bcd7-4b0f-b278-a3f2c5cb1ce0', '2026-03-30 19:20:00.81', NULL, NULL, NULL, NULL, 924);
INSERT INTO "public"."Uploads" VALUES (463, 'ตง.ถ.2-0060 ถนนห้วยยอด ซอย 34.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0060 ถนนห้วยยอด ซอย 34.jpg', 'image', NULL, '24f8eb23-fc50-48e5-9381-6818730f1e31', '2026-03-30 19:20:00.811', NULL, NULL, NULL, NULL, 924);
INSERT INTO "public"."Uploads" VALUES (464, 'ตง.ถ.2-0060 ถนนห้วยยอด ซอย 35.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0060 ถนนห้วยยอด ซอย 35.jpg', 'image', NULL, 'f42130a5-634f-4fea-a056-04612296bdf7', '2026-03-30 19:20:00.811', NULL, NULL, NULL, NULL, 924);
INSERT INTO "public"."Uploads" VALUES (465, 'ตง.ถ.2-0060 ถนนห้วยยอด ซอย 36.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0060 ถนนห้วยยอด ซอย 36.jpg', 'image', NULL, 'b34f923c-2671-4bac-98e5-a2a95d5b9e41', '2026-03-30 19:20:00.812', NULL, NULL, NULL, NULL, 924);
INSERT INTO "public"."Uploads" VALUES (466, 'ตง.ถ.2-0060 ถนนห้วยยอด ซอย 37.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0060 ถนนห้วยยอด ซอย 37.jpg', 'image', NULL, '24e2887f-bb54-49bd-955e-85047fd7ca23', '2026-03-30 19:20:00.813', NULL, NULL, NULL, NULL, 924);
INSERT INTO "public"."Uploads" VALUES (467, 'ตง.ถ.2-0061 ถนนห้วยยอด ซอย 41.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0061 ถนนห้วยยอด ซอย 41.jpg', 'image', NULL, '51872862-5f76-4787-9522-b0a0f9c0b489', '2026-03-30 19:20:00.813', NULL, NULL, NULL, NULL, 925);
INSERT INTO "public"."Uploads" VALUES (468, 'ตง.ถ.2-0061 ถนนห้วยยอด ซอย 42.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0061 ถนนห้วยยอด ซอย 42.jpg', 'image', NULL, '9ba36e8e-318c-413a-a70b-d2eba37d8376', '2026-03-30 19:20:00.814', NULL, NULL, NULL, NULL, 925);
INSERT INTO "public"."Uploads" VALUES (469, 'ตง.ถ.2-0061 ถนนห้วยยอด ซอย 43.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0061 ถนนห้วยยอด ซอย 43.jpg', 'image', NULL, '6977d8eb-0c5c-4377-b0d3-5eb262bf7220', '2026-03-30 19:20:00.814', NULL, NULL, NULL, NULL, 925);
INSERT INTO "public"."Uploads" VALUES (470, 'ตง.ถ.2-0061 ถนนห้วยยอด ซอย 44.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0061 ถนนห้วยยอด ซอย 44.jpg', 'image', NULL, '9fffc730-b71d-44b5-8de7-99d7fff0e276', '2026-03-30 19:20:00.815', NULL, NULL, NULL, NULL, 925);
INSERT INTO "public"."Uploads" VALUES (471, 'ตง.ถ.2-0061 ถนนห้วยยอด ซอย 45.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0061 ถนนห้วยยอด ซอย 45.jpg', 'image', NULL, '897db0fc-7674-4b03-b6ae-01980190d7bc', '2026-03-30 19:20:00.815', NULL, NULL, NULL, NULL, 925);
INSERT INTO "public"."Uploads" VALUES (472, 'ตง.ถ.2-0061 ถนนห้วยยอด ซอย 46.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0061 ถนนห้วยยอด ซอย 46.jpg', 'image', NULL, '517810b2-4eea-4cdc-aa03-60e8dcc5f1fb', '2026-03-30 19:20:00.816', NULL, NULL, NULL, NULL, 925);
INSERT INTO "public"."Uploads" VALUES (473, 'ตง.ถ.2-0061 ถนนห้วยยอด ซอย 47.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0061 ถนนห้วยยอด ซอย 47.jpg', 'image', NULL, 'e3ed6e9d-50f5-4b52-967e-0839c02abfff', '2026-03-30 19:20:00.816', NULL, NULL, NULL, NULL, 925);
INSERT INTO "public"."Uploads" VALUES (474, 'ตง.ถ.2-0062 ถนนห้วยยอด ซอย 51.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0062 ถนนห้วยยอด ซอย 51.jpg', 'image', NULL, 'a4cccfab-6bcb-4eb5-a8eb-efc73be3a33f', '2026-03-30 19:20:00.817', NULL, NULL, NULL, NULL, 926);
INSERT INTO "public"."Uploads" VALUES (475, 'ตง.ถ.2-0062 ถนนห้วยยอด ซอย 52.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0062 ถนนห้วยยอด ซอย 52.jpg', 'image', NULL, '4565ce36-ea2f-429e-b8d9-152c62c8aed1', '2026-03-30 19:20:00.818', NULL, NULL, NULL, NULL, 926);
INSERT INTO "public"."Uploads" VALUES (476, 'ตง.ถ.2-0062 ถนนห้วยยอด ซอย 53.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0062 ถนนห้วยยอด ซอย 53.jpg', 'image', NULL, '609f7da7-d5ac-42bb-9779-5a6d0a784558', '2026-03-30 19:20:00.818', NULL, NULL, NULL, NULL, 926);
INSERT INTO "public"."Uploads" VALUES (477, 'ตง.ถ.2-0062 ถนนห้วยยอด ซอย 54.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0062 ถนนห้วยยอด ซอย 54.jpg', 'image', NULL, '4f799a12-62cf-48c9-9ad5-a58b558cae3e', '2026-03-30 19:20:00.819', NULL, NULL, NULL, NULL, 926);
INSERT INTO "public"."Uploads" VALUES (478, 'ตง.ถ.2-0062 ถนนห้วยยอด ซอย 55.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0062 ถนนห้วยยอด ซอย 55.jpg', 'image', NULL, 'e6c7203c-26b2-4a51-b41e-009f94db9313', '2026-03-30 19:20:00.82', NULL, NULL, NULL, NULL, 926);
INSERT INTO "public"."Uploads" VALUES (479, 'ตง.ถ.2-0062 ถนนห้วยยอด ซอย 56.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0062 ถนนห้วยยอด ซอย 56.jpg', 'image', NULL, 'eb411bf2-7599-432a-a0d4-999f0411d146', '2026-03-30 19:20:00.821', NULL, NULL, NULL, NULL, 926);
INSERT INTO "public"."Uploads" VALUES (480, 'ตง.ถ.2-0062 ถนนห้วยยอด ซอย 57.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0062 ถนนห้วยยอด ซอย 57.jpg', 'image', NULL, '20f9a774-992b-4a4e-92b1-5053b200f756', '2026-03-30 19:20:00.822', NULL, NULL, NULL, NULL, 926);
INSERT INTO "public"."Uploads" VALUES (481, 'ตง.ถ.2-0063 ถนนห้วยยอด ซอย 6(AIA)1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0063 ถนนห้วยยอด ซอย 6(AIA)1.jpg', 'image', NULL, '0eee9063-0dd9-4665-a166-69ec8eed5ae1', '2026-03-30 19:20:00.822', NULL, NULL, NULL, NULL, 927);
INSERT INTO "public"."Uploads" VALUES (482, 'ตง.ถ.2-0063 ถนนห้วยยอด ซอย 6(AIA)2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0063 ถนนห้วยยอด ซอย 6(AIA)2.jpg', 'image', NULL, '67b6fd98-d7b8-4571-8e74-d3f4b89dfc3d', '2026-03-30 19:20:00.822', NULL, NULL, NULL, NULL, 927);
INSERT INTO "public"."Uploads" VALUES (483, 'ตง.ถ.2-0063 ถนนห้วยยอด ซอย 6(AIA)3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0063 ถนนห้วยยอด ซอย 6(AIA)3.jpg', 'image', NULL, '0506b411-1d9f-47b6-8416-374ee1c35890', '2026-03-30 19:20:00.823', NULL, NULL, NULL, NULL, 927);
INSERT INTO "public"."Uploads" VALUES (484, 'ตง.ถ.2-0063 ถนนห้วยยอด ซอย 6(AIA)4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0063 ถนนห้วยยอด ซอย 6(AIA)4.jpg', 'image', NULL, 'b4233e7f-f676-4c6d-aba2-33b5bfdf8155', '2026-03-30 19:20:00.823', NULL, NULL, NULL, NULL, 927);
INSERT INTO "public"."Uploads" VALUES (485, 'ตง.ถ.2-0063 ถนนห้วยยอด ซอย 6(AIA)5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0063 ถนนห้วยยอด ซอย 6(AIA)5.jpg', 'image', NULL, 'f84a9180-a1d8-4c00-861d-0dc11a9e0e99', '2026-03-30 19:20:00.824', NULL, NULL, NULL, NULL, 927);
INSERT INTO "public"."Uploads" VALUES (486, 'ตง.ถ.2-0063 ถนนห้วยยอด ซอย 6(AIA)6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0063 ถนนห้วยยอด ซอย 6(AIA)6.jpg', 'image', NULL, 'e6ed4346-8e0b-4226-8461-8f28aa565281', '2026-03-30 19:20:00.825', NULL, NULL, NULL, NULL, 927);
INSERT INTO "public"."Uploads" VALUES (352, 'ตง.ถ.2-0044 ถนนกันตังซอย 76.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0044 ถนนกันตังซอย 76.jpg', 'image', NULL, 'eb3edc01-8088-4faf-a88c-daee9d362e69', '2026-03-30 19:20:00.746', NULL, NULL, NULL, NULL, 908);
INSERT INTO "public"."Uploads" VALUES (487, 'ตง.ถ.2-0063 ถนนห้วยยอด ซอย 6(AIA)7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0063 ถนนห้วยยอด ซอย 6(AIA)7.jpg', 'image', NULL, '35fa1ee9-9fbe-4a13-8775-facc15798ee1', '2026-03-30 19:20:00.825', NULL, NULL, NULL, NULL, 927);
INSERT INTO "public"."Uploads" VALUES (488, 'ตง.ถ.2-0064 ถนนห้วยยอด ซอย 8 (วังชา)1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0064 ถนนห้วยยอด ซอย 8 (วังชา)1.jpg', 'image', NULL, '4c3cded2-51b6-4b21-bc86-2dbb88afb84b', '2026-03-30 19:20:00.829', NULL, NULL, NULL, NULL, 928);
INSERT INTO "public"."Uploads" VALUES (489, 'ตง.ถ.2-0064 ถนนห้วยยอด ซอย 8 (วังชา)2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0064 ถนนห้วยยอด ซอย 8 (วังชา)2.jpg', 'image', NULL, '3bd37149-4864-4318-a114-cf5a1b8110d3', '2026-03-30 19:20:00.829', NULL, NULL, NULL, NULL, 928);
INSERT INTO "public"."Uploads" VALUES (490, 'ตง.ถ.2-0064 ถนนห้วยยอด ซอย 8 (วังชา)3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0064 ถนนห้วยยอด ซอย 8 (วังชา)3.jpg', 'image', NULL, '6059f2fa-7e67-438d-a070-d3869437ea0a', '2026-03-30 19:20:00.83', NULL, NULL, NULL, NULL, 928);
INSERT INTO "public"."Uploads" VALUES (491, 'ตง.ถ.2-0064 ถนนห้วยยอด ซอย 8 (วังชา)4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0064 ถนนห้วยยอด ซอย 8 (วังชา)4.jpg', 'image', NULL, '3bef5542-b038-4c25-bb0a-bd08d3d664a5', '2026-03-30 19:20:00.83', NULL, NULL, NULL, NULL, 928);
INSERT INTO "public"."Uploads" VALUES (492, 'ตง.ถ.2-0064 ถนนห้วยยอด ซอย 8 (วังชา)5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0064 ถนนห้วยยอด ซอย 8 (วังชา)5.jpg', 'image', NULL, '5ad2e958-5200-433b-b4eb-17a6aed65d90', '2026-03-30 19:20:00.831', NULL, NULL, NULL, NULL, 928);
INSERT INTO "public"."Uploads" VALUES (493, 'ตง.ถ.2-0064 ถนนห้วยยอด ซอย 8 (วังชา)6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0064 ถนนห้วยยอด ซอย 8 (วังชา)6.jpg', 'image', NULL, 'e142d490-1437-41fe-ac8b-962095b15691', '2026-03-30 19:20:00.831', NULL, NULL, NULL, NULL, 928);
INSERT INTO "public"."Uploads" VALUES (494, 'ตง.ถ.2-0064 ถนนห้วยยอด ซอย 8 (วังชา)7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0064 ถนนห้วยยอด ซอย 8 (วังชา)7.jpg', 'image', NULL, 'f62c730d-f9c2-4b20-b063-2177143771c2', '2026-03-30 19:20:00.832', NULL, NULL, NULL, NULL, 928);
INSERT INTO "public"."Uploads" VALUES (516, 'ตง.ถ.2-0068 ถนนห้วยยอด ซอย 111.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0068 ถนนห้วยยอด ซอย 111.jpg', 'image', NULL, '32945bdb-482a-4eb2-8aa9-57845b3144ae', '2026-03-30 19:20:00.847', NULL, NULL, NULL, NULL, 932);
INSERT INTO "public"."Uploads" VALUES (517, 'ตง.ถ.2-0068 ถนนห้วยยอด ซอย 112.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0068 ถนนห้วยยอด ซอย 112.jpg', 'image', NULL, '762c0f87-69a3-4a24-84a8-f4d9c27e848e', '2026-03-30 19:20:00.848', NULL, NULL, NULL, NULL, 932);
INSERT INTO "public"."Uploads" VALUES (518, 'ตง.ถ.2-0068 ถนนห้วยยอด ซอย 113.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0068 ถนนห้วยยอด ซอย 113.jpg', 'image', NULL, '52a1ebe2-c6b3-4b56-8e03-34f4d21cce32', '2026-03-30 19:20:00.848', NULL, NULL, NULL, NULL, 932);
INSERT INTO "public"."Uploads" VALUES (519, 'ตง.ถ.2-0068 ถนนห้วยยอด ซอย 114.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0068 ถนนห้วยยอด ซอย 114.jpg', 'image', NULL, '849d99e3-8489-4f62-a179-fb6c6d8443a5', '2026-03-30 19:20:00.849', NULL, NULL, NULL, NULL, 932);
INSERT INTO "public"."Uploads" VALUES (520, 'ตง.ถ.2-0068 ถนนห้วยยอด ซอย 115.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0068 ถนนห้วยยอด ซอย 115.jpg', 'image', NULL, 'f0df5bac-55db-4977-8695-91707873c34e', '2026-03-30 19:20:00.85', NULL, NULL, NULL, NULL, 932);
INSERT INTO "public"."Uploads" VALUES (521, 'ตง.ถ.2-0068 ถนนห้วยยอด ซอย 116.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0068 ถนนห้วยยอด ซอย 116.jpg', 'image', NULL, 'cd4fc44b-ace4-4152-8861-54ace9de85c5', '2026-03-30 19:20:00.85', NULL, NULL, NULL, NULL, 932);
INSERT INTO "public"."Uploads" VALUES (522, 'ตง.ถ.2-0068 ถนนห้วยยอด ซอย 117.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0068 ถนนห้วยยอด ซอย 117.jpg', 'image', NULL, 'e56490ca-8f02-409c-9763-1c1b02f61e32', '2026-03-30 19:20:00.851', NULL, NULL, NULL, NULL, 932);
INSERT INTO "public"."Uploads" VALUES (523, 'ตง.ถ.2-0069 ถนนห้วยยอด ซอย 121.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0069 ถนนห้วยยอด ซอย 121.jpg', 'image', NULL, '0f1daacb-5f80-47d6-985f-3da408c678e8', '2026-03-30 19:20:00.852', NULL, NULL, NULL, NULL, 933);
INSERT INTO "public"."Uploads" VALUES (524, 'ตง.ถ.2-0069 ถนนห้วยยอด ซอย 122.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0069 ถนนห้วยยอด ซอย 122.jpg', 'image', NULL, 'b8bce9c4-8a1a-486e-bb42-d953a4c381f2', '2026-03-30 19:20:00.852', NULL, NULL, NULL, NULL, 933);
INSERT INTO "public"."Uploads" VALUES (525, 'ตง.ถ.2-0069 ถนนห้วยยอด ซอย 123.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0069 ถนนห้วยยอด ซอย 123.jpg', 'image', NULL, '0a6194a8-13ba-4366-a48c-0aba49d0893b', '2026-03-30 19:20:00.853', NULL, NULL, NULL, NULL, 933);
INSERT INTO "public"."Uploads" VALUES (526, 'ตง.ถ.2-0069 ถนนห้วยยอด ซอย 124.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0069 ถนนห้วยยอด ซอย 124.jpg', 'image', NULL, '8b32ecba-ee08-445f-b08e-bf716bae4a00', '2026-03-30 19:20:00.853', NULL, NULL, NULL, NULL, 933);
INSERT INTO "public"."Uploads" VALUES (527, 'ตง.ถ.2-0069 ถนนห้วยยอด ซอย 125.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0069 ถนนห้วยยอด ซอย 125.jpg', 'image', NULL, '5d382ba8-4758-491b-bdb3-967fb1893abb', '2026-03-30 19:20:00.854', NULL, NULL, NULL, NULL, 933);
INSERT INTO "public"."Uploads" VALUES (528, 'ตง.ถ.2-0069 ถนนห้วยยอด ซอย 126.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0069 ถนนห้วยยอด ซอย 126.jpg', 'image', NULL, '4b72cc73-140b-4150-9b7c-c9d02fb45455', '2026-03-30 19:20:00.855', NULL, NULL, NULL, NULL, 933);
INSERT INTO "public"."Uploads" VALUES (529, 'ตง.ถ.2-0069 ถนนห้วยยอด ซอย 127.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0069 ถนนห้วยยอด ซอย 127.jpg', 'image', NULL, '01360b90-f5f9-4f86-a408-002a375620a9', '2026-03-30 19:20:00.856', NULL, NULL, NULL, NULL, 933);
INSERT INTO "public"."Uploads" VALUES (530, 'ตง.ถ.2-0070 ถนนห้วยยอด ซอย 131.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0070 ถนนห้วยยอด ซอย 131.jpg', 'image', NULL, '6c4f4b82-5a64-46eb-801f-524d861b1d07', '2026-03-30 19:20:00.856', NULL, NULL, NULL, NULL, 934);
INSERT INTO "public"."Uploads" VALUES (531, 'ตง.ถ.2-0070 ถนนห้วยยอด ซอย 132.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0070 ถนนห้วยยอด ซอย 132.jpg', 'image', NULL, '4e9f62d1-705b-49c5-b0f0-9a54e3ac7035', '2026-03-30 19:20:00.857', NULL, NULL, NULL, NULL, 934);
INSERT INTO "public"."Uploads" VALUES (532, 'ตง.ถ.2-0070 ถนนห้วยยอด ซอย 133.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0070 ถนนห้วยยอด ซอย 133.jpg', 'image', NULL, '3f202dae-da76-4788-8e6f-78459be70687', '2026-03-30 19:20:00.857', NULL, NULL, NULL, NULL, 934);
INSERT INTO "public"."Uploads" VALUES (533, 'ตง.ถ.2-0070 ถนนห้วยยอด ซอย 134.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0070 ถนนห้วยยอด ซอย 134.jpg', 'image', NULL, 'a154cc78-3582-4bfc-b22e-74e9a7b4e5e5', '2026-03-30 19:20:00.858', NULL, NULL, NULL, NULL, 934);
INSERT INTO "public"."Uploads" VALUES (534, 'ตง.ถ.2-0070 ถนนห้วยยอด ซอย 135.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0070 ถนนห้วยยอด ซอย 135.jpg', 'image', NULL, '74303bb0-5a74-43a7-88a7-a7f9ad3274d5', '2026-03-30 19:20:00.858', NULL, NULL, NULL, NULL, 934);
INSERT INTO "public"."Uploads" VALUES (353, 'ตง.ถ.2-0044 ถนนกันตังซอย 77.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0044 ถนนกันตังซอย 77.jpg', 'image', NULL, '34751136-9fa7-41dd-bbd7-bad93453ee34', '2026-03-30 19:20:00.747', NULL, NULL, NULL, NULL, 908);
INSERT INTO "public"."Uploads" VALUES (535, 'ตง.ถ.2-0070 ถนนห้วยยอด ซอย 136.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0070 ถนนห้วยยอด ซอย 136.jpg', 'image', NULL, '8e630c3c-6078-4875-a825-9f7f8ece6ccd', '2026-03-30 19:20:00.859', NULL, NULL, NULL, NULL, 934);
INSERT INTO "public"."Uploads" VALUES (536, 'ตง.ถ.2-0070 ถนนห้วยยอด ซอย 137.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0070 ถนนห้วยยอด ซอย 137.jpg', 'image', NULL, 'af3f86c1-f990-461d-ac52-fc26e5dd851f', '2026-03-30 19:20:00.859', NULL, NULL, NULL, NULL, 934);
INSERT INTO "public"."Uploads" VALUES (537, 'ตง.ถ.2-0071 ถนนห้วยยอด ซอย 141.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0071 ถนนห้วยยอด ซอย 141.jpg', 'image', NULL, '802c667a-52c9-4a16-8232-c606cca5d175', '2026-03-30 19:20:00.86', NULL, NULL, NULL, NULL, 935);
INSERT INTO "public"."Uploads" VALUES (538, 'ตง.ถ.2-0071 ถนนห้วยยอด ซอย 142.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0071 ถนนห้วยยอด ซอย 142.jpg', 'image', NULL, '5cc4c927-1222-4e97-974f-bb44be1bdc31', '2026-03-30 19:20:00.86', NULL, NULL, NULL, NULL, 935);
INSERT INTO "public"."Uploads" VALUES (539, 'ตง.ถ.2-0071 ถนนห้วยยอด ซอย 143.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0071 ถนนห้วยยอด ซอย 143.jpg', 'image', NULL, '1cdef825-d153-4226-931d-77b6c4910a5c', '2026-03-30 19:20:00.861', NULL, NULL, NULL, NULL, 935);
INSERT INTO "public"."Uploads" VALUES (540, 'ตง.ถ.2-0071 ถนนห้วยยอด ซอย 144.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0071 ถนนห้วยยอด ซอย 144.jpg', 'image', NULL, '1dd84e56-c66d-4715-b6ea-f6bf30167499', '2026-03-30 19:20:00.862', NULL, NULL, NULL, NULL, 935);
INSERT INTO "public"."Uploads" VALUES (541, 'ตง.ถ.2-0071 ถนนห้วยยอด ซอย 145.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0071 ถนนห้วยยอด ซอย 145.jpg', 'image', NULL, '0942da1e-6643-465e-baa0-067e9e3ff7fd', '2026-03-30 19:20:00.863', NULL, NULL, NULL, NULL, 935);
INSERT INTO "public"."Uploads" VALUES (542, 'ตง.ถ.2-0071 ถนนห้วยยอด ซอย 146.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0071 ถนนห้วยยอด ซอย 146.jpg', 'image', NULL, '98125564-b0ac-4043-8f6b-2b10573c1536', '2026-03-30 19:20:00.863', NULL, NULL, NULL, NULL, 935);
INSERT INTO "public"."Uploads" VALUES (543, 'ตง.ถ.2-0071 ถนนห้วยยอด ซอย 147.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0071 ถนนห้วยยอด ซอย 147.jpg', 'image', NULL, '9ee8bf0c-4076-4d6a-b74d-0cd4f1393cd4', '2026-03-30 19:20:00.864', NULL, NULL, NULL, NULL, 935);
INSERT INTO "public"."Uploads" VALUES (544, 'ตง.ถ.2-0072 ถนนห้วยยอด ซอย 161.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0072 ถนนห้วยยอด ซอย 161.jpg', 'image', NULL, '19b15511-8923-40d8-a868-9f209922f8f1', '2026-03-30 19:20:00.864', NULL, NULL, NULL, NULL, 936);
INSERT INTO "public"."Uploads" VALUES (545, 'ตง.ถ.2-0072 ถนนห้วยยอด ซอย 162.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0072 ถนนห้วยยอด ซอย 162.jpg', 'image', NULL, 'f11cf049-473b-48ae-9c6c-fdeb00ffcf59', '2026-03-30 19:20:00.865', NULL, NULL, NULL, NULL, 936);
INSERT INTO "public"."Uploads" VALUES (546, 'ตง.ถ.2-0072 ถนนห้วยยอด ซอย 163.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0072 ถนนห้วยยอด ซอย 163.jpg', 'image', NULL, 'd2d18ae4-c5fc-4a7a-8495-419e158446f5', '2026-03-30 19:20:00.865', NULL, NULL, NULL, NULL, 936);
INSERT INTO "public"."Uploads" VALUES (547, 'ตง.ถ.2-0072 ถนนห้วยยอด ซอย 164.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0072 ถนนห้วยยอด ซอย 164.jpg', 'image', NULL, '0272a604-f9b9-44be-ac5b-739d2e81d191', '2026-03-30 19:20:00.866', NULL, NULL, NULL, NULL, 936);
INSERT INTO "public"."Uploads" VALUES (548, 'ตง.ถ.2-0072 ถนนห้วยยอด ซอย 165.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0072 ถนนห้วยยอด ซอย 165.jpg', 'image', NULL, 'b11155f4-a4d8-4566-bd01-2bb672ae7012', '2026-03-30 19:20:00.867', NULL, NULL, NULL, NULL, 936);
INSERT INTO "public"."Uploads" VALUES (549, 'ตง.ถ.2-0072 ถนนห้วยยอด ซอย 166.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0072 ถนนห้วยยอด ซอย 166.jpg', 'image', NULL, '2298d7c7-bcd7-4a3f-abeb-63661fd42410', '2026-03-30 19:20:00.868', NULL, NULL, NULL, NULL, 936);
INSERT INTO "public"."Uploads" VALUES (550, 'ตง.ถ.2-0072 ถนนห้วยยอด ซอย 167.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0072 ถนนห้วยยอด ซอย 167.jpg', 'image', NULL, '7006563a-f71d-4dad-90a4-e9c60674ba6b', '2026-03-30 19:20:00.869', NULL, NULL, NULL, NULL, 936);
INSERT INTO "public"."Uploads" VALUES (551, 'ตง.ถ.2-0073 ถนนห้วยยอด ซอย 171.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0073 ถนนห้วยยอด ซอย 171.jpg', 'image', NULL, 'c5c8507f-ac22-4fe9-9d5c-e1e9553a287b', '2026-03-30 19:20:00.87', NULL, NULL, NULL, NULL, 937);
INSERT INTO "public"."Uploads" VALUES (552, 'ตง.ถ.2-0073 ถนนห้วยยอด ซอย 172.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0073 ถนนห้วยยอด ซอย 172.jpg', 'image', NULL, '8cdb616b-b558-4b6f-89e5-6fc07f6c6c2e', '2026-03-30 19:20:00.87', NULL, NULL, NULL, NULL, 937);
INSERT INTO "public"."Uploads" VALUES (553, 'ตง.ถ.2-0073 ถนนห้วยยอด ซอย 173.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0073 ถนนห้วยยอด ซอย 173.jpg', 'image', NULL, '3ee29b9c-8e1a-45bb-99bb-1cfc0b297774', '2026-03-30 19:20:00.871', NULL, NULL, NULL, NULL, 937);
INSERT INTO "public"."Uploads" VALUES (554, 'ตง.ถ.2-0073 ถนนห้วยยอด ซอย 174.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0073 ถนนห้วยยอด ซอย 174.jpg', 'image', NULL, '85696687-4d12-42cc-9710-3a33be990e87', '2026-03-30 19:20:00.871', NULL, NULL, NULL, NULL, 937);
INSERT INTO "public"."Uploads" VALUES (555, 'ตง.ถ.2-0073 ถนนห้วยยอด ซอย 175.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0073 ถนนห้วยยอด ซอย 175.jpg', 'image', NULL, '9b444435-2c94-44f5-bb8a-fe88bb6e2e4f', '2026-03-30 19:20:00.872', NULL, NULL, NULL, NULL, 937);
INSERT INTO "public"."Uploads" VALUES (556, 'ตง.ถ.2-0073 ถนนห้วยยอด ซอย 176.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0073 ถนนห้วยยอด ซอย 176.jpg', 'image', NULL, 'da0cc560-ea61-4f7e-b912-525a0414cbe1', '2026-03-30 19:20:00.872', NULL, NULL, NULL, NULL, 937);
INSERT INTO "public"."Uploads" VALUES (557, 'ตง.ถ.2-0073 ถนนห้วยยอด ซอย 177.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0073 ถนนห้วยยอด ซอย 177.jpg', 'image', NULL, '911ddab0-0b07-4345-9752-a6d90b033943', '2026-03-30 19:20:00.873', NULL, NULL, NULL, NULL, 937);
INSERT INTO "public"."Uploads" VALUES (558, 'ตง.ถ.2-0074 ถนนห้วยยอด ซอย 18(สินไชย)1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0074 ถนนห้วยยอด ซอย 18(สินไชย)1.jpg', 'image', NULL, '5aff3a3d-c798-410f-8ed0-e4d84da49ec8', '2026-03-30 19:20:00.873', NULL, NULL, NULL, NULL, 938);
INSERT INTO "public"."Uploads" VALUES (559, 'ตง.ถ.2-0074 ถนนห้วยยอด ซอย 18(สินไชย)2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0074 ถนนห้วยยอด ซอย 18(สินไชย)2.jpg', 'image', NULL, 'a374f66b-2707-48e5-86f9-3fac64a4a692', '2026-03-30 19:20:00.874', NULL, NULL, NULL, NULL, 938);
INSERT INTO "public"."Uploads" VALUES (560, 'ตง.ถ.2-0074 ถนนห้วยยอด ซอย 18(สินไชย)3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0074 ถนนห้วยยอด ซอย 18(สินไชย)3.jpg', 'image', NULL, '583f2842-3121-4d9f-83b0-c114c66a9170', '2026-03-30 19:20:00.875', NULL, NULL, NULL, NULL, 938);
INSERT INTO "public"."Uploads" VALUES (561, 'ตง.ถ.2-0074 ถนนห้วยยอด ซอย 18(สินไชย)4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0074 ถนนห้วยยอด ซอย 18(สินไชย)4.jpg', 'image', NULL, '1ec3611c-9704-4fc9-a630-4c7943f149ff', '2026-03-30 19:20:00.876', NULL, NULL, NULL, NULL, 938);
INSERT INTO "public"."Uploads" VALUES (562, 'ตง.ถ.2-0074 ถนนห้วยยอด ซอย 18(สินไชย)5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0074 ถนนห้วยยอด ซอย 18(สินไชย)5.jpg', 'image', NULL, '990dbede-9f95-45d0-a25b-529bacab776c', '2026-03-30 19:20:00.876', NULL, NULL, NULL, NULL, 938);
INSERT INTO "public"."Uploads" VALUES (563, 'ตง.ถ.2-0074 ถนนห้วยยอด ซอย 18(สินไชย)6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0074 ถนนห้วยยอด ซอย 18(สินไชย)6.jpg', 'image', NULL, 'b4ae269d-082d-4bc0-aabf-0eae29560dc3', '2026-03-30 19:20:00.877', NULL, NULL, NULL, NULL, 938);
INSERT INTO "public"."Uploads" VALUES (564, 'ตง.ถ.2-0074 ถนนห้วยยอด ซอย 18(สินไชย)7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0074 ถนนห้วยยอด ซอย 18(สินไชย)7.jpg', 'image', NULL, '3d548272-8162-495e-a1a9-41b5ef1b3a48', '2026-03-30 19:20:00.878', NULL, NULL, NULL, NULL, 938);
INSERT INTO "public"."Uploads" VALUES (565, 'ตง.ถ.2-0075 ถนนห้วยยอด ซอย 191.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0075 ถนนห้วยยอด ซอย 191.jpg', 'image', NULL, '80464cae-595a-4938-94ef-fbe904b769c0', '2026-03-30 19:20:00.878', NULL, NULL, NULL, NULL, 939);
INSERT INTO "public"."Uploads" VALUES (566, 'ตง.ถ.2-0075 ถนนห้วยยอด ซอย 192.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0075 ถนนห้วยยอด ซอย 192.jpg', 'image', NULL, '31bcd78f-16f3-4fe5-931c-106d6cdf0107', '2026-03-30 19:20:00.879', NULL, NULL, NULL, NULL, 939);
INSERT INTO "public"."Uploads" VALUES (567, 'ตง.ถ.2-0075 ถนนห้วยยอด ซอย 193.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0075 ถนนห้วยยอด ซอย 193.jpg', 'image', NULL, '35b74974-b74d-4d61-9a2e-1f2e2dee65a9', '2026-03-30 19:20:00.879', NULL, NULL, NULL, NULL, 939);
INSERT INTO "public"."Uploads" VALUES (568, 'ตง.ถ.2-0075 ถนนห้วยยอด ซอย 194.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0075 ถนนห้วยยอด ซอย 194.jpg', 'image', NULL, '2801b07a-2148-4082-8364-0fb8182bf95d', '2026-03-30 19:20:00.88', NULL, NULL, NULL, NULL, 939);
INSERT INTO "public"."Uploads" VALUES (569, 'ตง.ถ.2-0075 ถนนห้วยยอด ซอย 195.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0075 ถนนห้วยยอด ซอย 195.jpg', 'image', NULL, 'bca309c1-9574-4e47-98f9-2326ebb61c6d', '2026-03-30 19:20:00.88', NULL, NULL, NULL, NULL, 939);
INSERT INTO "public"."Uploads" VALUES (570, 'ตง.ถ.2-0075 ถนนห้วยยอด ซอย 196.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0075 ถนนห้วยยอด ซอย 196.jpg', 'image', NULL, 'e827a6db-f304-45ec-aafb-05be72990756', '2026-03-30 19:20:00.881', NULL, NULL, NULL, NULL, 939);
INSERT INTO "public"."Uploads" VALUES (571, 'ตง.ถ.2-0075 ถนนห้วยยอด ซอย 197.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0075 ถนนห้วยยอด ซอย 197.jpg', 'image', NULL, '4db562a8-56de-455b-bfac-b851d8afc6a4', '2026-03-30 19:20:00.882', NULL, NULL, NULL, NULL, 939);
INSERT INTO "public"."Uploads" VALUES (572, 'ตง.ถ.2-0076 ถนนห้วยยอด ซอย 211.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0076 ถนนห้วยยอด ซอย 211.jpg', 'image', NULL, 'c6c5aa9e-9cc2-4673-a3b7-b4aeb6eb9c45', '2026-03-30 19:20:00.883', NULL, NULL, NULL, NULL, 940);
INSERT INTO "public"."Uploads" VALUES (573, 'ตง.ถ.2-0076 ถนนห้วยยอด ซอย 212.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0076 ถนนห้วยยอด ซอย 212.jpg', 'image', NULL, '440a6de7-646f-439d-9d2f-6d6b71264f0b', '2026-03-30 19:20:00.884', NULL, NULL, NULL, NULL, 940);
INSERT INTO "public"."Uploads" VALUES (574, 'ตง.ถ.2-0076 ถนนห้วยยอด ซอย 213.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0076 ถนนห้วยยอด ซอย 213.jpg', 'image', NULL, 'a6cde28a-511c-4120-a5db-36ef350eb1c6', '2026-03-30 19:20:00.884', NULL, NULL, NULL, NULL, 940);
INSERT INTO "public"."Uploads" VALUES (575, 'ตง.ถ.2-0076 ถนนห้วยยอด ซอย 214.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0076 ถนนห้วยยอด ซอย 214.jpg', 'image', NULL, '192dccaa-2134-4c84-87ae-098436d29512', '2026-03-30 19:20:00.885', NULL, NULL, NULL, NULL, 940);
INSERT INTO "public"."Uploads" VALUES (576, 'ตง.ถ.2-0076 ถนนห้วยยอด ซอย 215.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0076 ถนนห้วยยอด ซอย 215.jpg', 'image', NULL, 'b478312a-af55-4666-b2c3-d1a5ccec81c4', '2026-03-30 19:20:00.885', NULL, NULL, NULL, NULL, 940);
INSERT INTO "public"."Uploads" VALUES (577, 'ตง.ถ.2-0076 ถนนห้วยยอด ซอย 216.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0076 ถนนห้วยยอด ซอย 216.jpg', 'image', NULL, 'be139638-3a41-4d8b-9423-5c5dad45e5dd', '2026-03-30 19:20:00.886', NULL, NULL, NULL, NULL, 940);
INSERT INTO "public"."Uploads" VALUES (578, 'ตง.ถ.2-0076 ถนนห้วยยอด ซอย 217.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0076 ถนนห้วยยอด ซอย 217.jpg', 'image', NULL, '5669526b-d501-4717-9235-d9dee1ceef22', '2026-03-30 19:20:00.886', NULL, NULL, NULL, NULL, 940);
INSERT INTO "public"."Uploads" VALUES (579, 'ตง.ถ.2-0077 ถนนห้วยยอด ซอย 221.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0077 ถนนห้วยยอด ซอย 221.jpg', 'image', NULL, 'ffb15ff6-3697-4aff-8ebe-1d7d1bd040e0', '2026-03-30 19:20:00.887', NULL, NULL, NULL, NULL, 941);
INSERT INTO "public"."Uploads" VALUES (580, 'ตง.ถ.2-0077 ถนนห้วยยอด ซอย 222.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0077 ถนนห้วยยอด ซอย 222.jpg', 'image', NULL, '3643118e-1690-483d-8392-f77d0e3849c7', '2026-03-30 19:20:00.887', NULL, NULL, NULL, NULL, 941);
INSERT INTO "public"."Uploads" VALUES (581, 'ตง.ถ.2-0077 ถนนห้วยยอด ซอย 223.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0077 ถนนห้วยยอด ซอย 223.jpg', 'image', NULL, 'd3baee00-9206-47c5-b7c3-5f66779d6b30', '2026-03-30 19:20:00.888', NULL, NULL, NULL, NULL, 941);
INSERT INTO "public"."Uploads" VALUES (582, 'ตง.ถ.2-0077 ถนนห้วยยอด ซอย 224.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0077 ถนนห้วยยอด ซอย 224.jpg', 'image', NULL, '35f9dbd3-1f47-4086-95e3-bdd55b08872f', '2026-03-30 19:20:00.888', NULL, NULL, NULL, NULL, 941);
INSERT INTO "public"."Uploads" VALUES (583, 'ตง.ถ.2-0077 ถนนห้วยยอด ซอย 225.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0077 ถนนห้วยยอด ซอย 225.jpg', 'image', NULL, '79cf169a-a496-4385-ac70-edb487044e95', '2026-03-30 19:20:00.889', NULL, NULL, NULL, NULL, 941);
INSERT INTO "public"."Uploads" VALUES (584, 'ตง.ถ.2-0077 ถนนห้วยยอด ซอย 226.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0077 ถนนห้วยยอด ซอย 226.jpg', 'image', NULL, 'e97402bb-b917-454c-98a9-1f80f7b4a855', '2026-03-30 19:20:00.89', NULL, NULL, NULL, NULL, 941);
INSERT INTO "public"."Uploads" VALUES (585, 'ตง.ถ.2-0077 ถนนห้วยยอด ซอย 227.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0077 ถนนห้วยยอด ซอย 227.jpg', 'image', NULL, '5fce9021-e8cf-4299-bd0a-7829df8a15fb', '2026-03-30 19:20:00.89', NULL, NULL, NULL, NULL, 941);
INSERT INTO "public"."Uploads" VALUES (586, 'ตง.ถ.2-0078 ถนนห้วยยอด ซอย 231.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0078 ถนนห้วยยอด ซอย 231.jpg', 'image', NULL, '6f695957-6637-4bd2-9779-f8b6e47c6737', '2026-03-30 19:20:00.891', NULL, NULL, NULL, NULL, 942);
INSERT INTO "public"."Uploads" VALUES (587, 'ตง.ถ.2-0078 ถนนห้วยยอด ซอย 232.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0078 ถนนห้วยยอด ซอย 232.jpg', 'image', NULL, '2ca6a5ab-6b0b-4266-8815-1a221ed908ad', '2026-03-30 19:20:00.891', NULL, NULL, NULL, NULL, 942);
INSERT INTO "public"."Uploads" VALUES (588, 'ตง.ถ.2-0078 ถนนห้วยยอด ซอย 233.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0078 ถนนห้วยยอด ซอย 233.jpg', 'image', NULL, '952b6a7e-9282-4240-89ba-cd7fac9c3931', '2026-03-30 19:20:00.892', NULL, NULL, NULL, NULL, 942);
INSERT INTO "public"."Uploads" VALUES (589, 'ตง.ถ.2-0078 ถนนห้วยยอด ซอย 234.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0078 ถนนห้วยยอด ซอย 234.jpg', 'image', NULL, '0e90ccdd-8f2d-433b-97d2-d40679f6f28d', '2026-03-30 19:20:00.892', NULL, NULL, NULL, NULL, 942);
INSERT INTO "public"."Uploads" VALUES (356, 'ตง.ถ.2-0045 ถนนกันตังซอย 83.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0045 ถนนกันตังซอย 83.jpg', 'image', NULL, '59fab462-669d-4b70-8493-1cefd52eacd9', '2026-03-30 19:20:00.748', NULL, NULL, NULL, NULL, 909);
INSERT INTO "public"."Uploads" VALUES (590, 'ตง.ถ.2-0078 ถนนห้วยยอด ซอย 235.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0078 ถนนห้วยยอด ซอย 235.jpg', 'image', NULL, '86dcadf6-adde-481c-af29-46fd369ebfc8', '2026-03-30 19:20:00.893', NULL, NULL, NULL, NULL, 942);
INSERT INTO "public"."Uploads" VALUES (591, 'ตง.ถ.2-0078 ถนนห้วยยอด ซอย 236.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0078 ถนนห้วยยอด ซอย 236.jpg', 'image', NULL, 'ef62d41a-c9bb-48b8-b670-b887fba544c4', '2026-03-30 19:20:00.893', NULL, NULL, NULL, NULL, 942);
INSERT INTO "public"."Uploads" VALUES (592, 'ตง.ถ.2-0078 ถนนห้วยยอด ซอย 237.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0078 ถนนห้วยยอด ซอย 237.jpg', 'image', NULL, '7e4b18a5-678b-4b6b-9217-9e68d3540fb1', '2026-03-30 19:20:00.894', NULL, NULL, NULL, NULL, 942);
INSERT INTO "public"."Uploads" VALUES (593, 'ตง.ถ.2-0079 ถนนห้วยยอด ซอย 241.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0079 ถนนห้วยยอด ซอย 241.jpg', 'image', NULL, 'cf5cedeb-4086-4925-9aa6-63249b6b46c0', '2026-03-30 19:20:00.894', NULL, NULL, NULL, NULL, 943);
INSERT INTO "public"."Uploads" VALUES (594, 'ตง.ถ.2-0079 ถนนห้วยยอด ซอย 242.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0079 ถนนห้วยยอด ซอย 242.jpg', 'image', NULL, '5ed09c7d-99d5-40e6-bc09-20d7fb26b8ee', '2026-03-30 19:20:00.895', NULL, NULL, NULL, NULL, 943);
INSERT INTO "public"."Uploads" VALUES (595, 'ตง.ถ.2-0079 ถนนห้วยยอด ซอย 243.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0079 ถนนห้วยยอด ซอย 243.jpg', 'image', NULL, '2a41c8ac-5c38-4882-ad91-9133d7062d83', '2026-03-30 19:20:00.896', NULL, NULL, NULL, NULL, 943);
INSERT INTO "public"."Uploads" VALUES (596, 'ตง.ถ.2-0079 ถนนห้วยยอด ซอย 244.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0079 ถนนห้วยยอด ซอย 244.jpg', 'image', NULL, '59dfcca8-6c20-47e1-85d8-9dfacced24a3', '2026-03-30 19:20:00.897', NULL, NULL, NULL, NULL, 943);
INSERT INTO "public"."Uploads" VALUES (597, 'ตง.ถ.2-0079 ถนนห้วยยอด ซอย 245.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0079 ถนนห้วยยอด ซอย 245.jpg', 'image', NULL, 'fb543e41-3e62-4531-a72e-3d45f0c86ef7', '2026-03-30 19:20:00.897', NULL, NULL, NULL, NULL, 943);
INSERT INTO "public"."Uploads" VALUES (598, 'ตง.ถ.2-0079 ถนนห้วยยอด ซอย 246.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0079 ถนนห้วยยอด ซอย 246.jpg', 'image', NULL, 'a8b1557d-dab5-41f9-adfd-7a9d2d19b5e9', '2026-03-30 19:20:00.898', NULL, NULL, NULL, NULL, 943);
INSERT INTO "public"."Uploads" VALUES (599, 'ตง.ถ.2-0079 ถนนห้วยยอด ซอย 247.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0079 ถนนห้วยยอด ซอย 247.jpg', 'image', NULL, 'c9329505-9fec-4b6e-9ab8-10f46746a589', '2026-03-30 19:20:00.899', NULL, NULL, NULL, NULL, 943);
INSERT INTO "public"."Uploads" VALUES (607, 'ตง.ถ.2-0081 ถนนห้วยยอด ซอย 301.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0081 ถนนห้วยยอด ซอย 301.jpg', 'image', NULL, '5f6b189d-1a48-43e9-819b-f7a27d24dd88', '2026-03-30 19:20:00.903', NULL, NULL, NULL, NULL, 945);
INSERT INTO "public"."Uploads" VALUES (608, 'ตง.ถ.2-0081 ถนนห้วยยอด ซอย 302.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0081 ถนนห้วยยอด ซอย 302.jpg', 'image', NULL, '3eedf31a-bafa-424f-b1b6-d6dbc1421e37', '2026-03-30 19:20:00.904', NULL, NULL, NULL, NULL, 945);
INSERT INTO "public"."Uploads" VALUES (609, 'ตง.ถ.2-0081 ถนนห้วยยอด ซอย 303.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0081 ถนนห้วยยอด ซอย 303.jpg', 'image', NULL, 'c042f465-6330-48bd-bf76-b4c183163498', '2026-03-30 19:20:00.905', NULL, NULL, NULL, NULL, 945);
INSERT INTO "public"."Uploads" VALUES (610, 'ตง.ถ.2-0081 ถนนห้วยยอด ซอย 304.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0081 ถนนห้วยยอด ซอย 304.jpg', 'image', NULL, '1a94c3c9-f788-4fc0-b5fe-17adb66e7b23', '2026-03-30 19:20:00.905', NULL, NULL, NULL, NULL, 945);
INSERT INTO "public"."Uploads" VALUES (611, 'ตง.ถ.2-0081 ถนนห้วยยอด ซอย 305.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0081 ถนนห้วยยอด ซอย 305.jpg', 'image', NULL, '96ee3772-7bc5-44a0-888d-e5547cad9cd5', '2026-03-30 19:20:00.906', NULL, NULL, NULL, NULL, 945);
INSERT INTO "public"."Uploads" VALUES (612, 'ตง.ถ.2-0081 ถนนห้วยยอด ซอย 306.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0081 ถนนห้วยยอด ซอย 306.jpg', 'image', NULL, '30f20eaf-30cf-4046-9fa3-c8cd4ccce643', '2026-03-30 19:20:00.906', NULL, NULL, NULL, NULL, 945);
INSERT INTO "public"."Uploads" VALUES (613, 'ตง.ถ.2-0081 ถนนห้วยยอด ซอย 307.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0081 ถนนห้วยยอด ซอย 307.jpg', 'image', NULL, '6a3a0d83-babd-472b-a360-595fce439e4f', '2026-03-30 19:20:00.907', NULL, NULL, NULL, NULL, 945);
INSERT INTO "public"."Uploads" VALUES (614, 'ตง.ถ.2-0082 ถนนห้วยยอด ซอย 321.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0082 ถนนห้วยยอด ซอย 321.jpg', 'image', NULL, 'fce5fb55-5610-40fb-a698-450b9b6a987b', '2026-03-30 19:20:00.907', NULL, NULL, NULL, NULL, 946);
INSERT INTO "public"."Uploads" VALUES (615, 'ตง.ถ.2-0082 ถนนห้วยยอด ซอย 322.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0082 ถนนห้วยยอด ซอย 322.jpg', 'image', NULL, '5d445d3d-2016-4394-a287-584ac02c5507', '2026-03-30 19:20:00.908', NULL, NULL, NULL, NULL, 946);
INSERT INTO "public"."Uploads" VALUES (616, 'ตง.ถ.2-0082 ถนนห้วยยอด ซอย 323.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0082 ถนนห้วยยอด ซอย 323.jpg', 'image', NULL, '85846b0a-0c8a-4028-a389-c3cd0b0d2f12', '2026-03-30 19:20:00.908', NULL, NULL, NULL, NULL, 946);
INSERT INTO "public"."Uploads" VALUES (617, 'ตง.ถ.2-0082 ถนนห้วยยอด ซอย 324.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0082 ถนนห้วยยอด ซอย 324.jpg', 'image', NULL, '55262a48-1556-4b62-9296-1a840446df02', '2026-03-30 19:20:00.909', NULL, NULL, NULL, NULL, 946);
INSERT INTO "public"."Uploads" VALUES (618, 'ตง.ถ.2-0082 ถนนห้วยยอด ซอย 325.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0082 ถนนห้วยยอด ซอย 325.jpg', 'image', NULL, '4a458557-ca57-47b7-8ad4-64385b85eab5', '2026-03-30 19:20:00.91', NULL, NULL, NULL, NULL, 946);
INSERT INTO "public"."Uploads" VALUES (619, 'ตง.ถ.2-0082 ถนนห้วยยอด ซอย 326.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0082 ถนนห้วยยอด ซอย 326.jpg', 'image', NULL, '709c0af5-a75d-4772-a0b0-dbf0bb88ebcc', '2026-03-30 19:20:00.911', NULL, NULL, NULL, NULL, 946);
INSERT INTO "public"."Uploads" VALUES (620, 'ตง.ถ.2-0082 ถนนห้วยยอด ซอย 327.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0082 ถนนห้วยยอด ซอย 327.jpg', 'image', NULL, 'b7ed594a-9ec9-44b9-8760-9c469868cf71', '2026-03-30 19:20:00.912', NULL, NULL, NULL, NULL, 946);
INSERT INTO "public"."Uploads" VALUES (621, 'ตง.ถ.2-0083 ถนนห้วยยอด ซอยบ่อนไก่1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0083 ถนนห้วยยอด ซอยบ่อนไก่1.jpg', 'image', NULL, '9e93091b-9b95-4e59-bdbf-48f5e1133f5a', '2026-03-30 19:20:00.912', NULL, NULL, NULL, NULL, 947);
INSERT INTO "public"."Uploads" VALUES (622, 'ตง.ถ.2-0083 ถนนห้วยยอด ซอยบ่อนไก่2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0083 ถนนห้วยยอด ซอยบ่อนไก่2.jpg', 'image', NULL, 'bb6b8e44-226d-400a-bb1c-e8b46216c79c', '2026-03-30 19:20:00.913', NULL, NULL, NULL, NULL, 947);
INSERT INTO "public"."Uploads" VALUES (623, 'ตง.ถ.2-0083 ถนนห้วยยอด ซอยบ่อนไก่3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0083 ถนนห้วยยอด ซอยบ่อนไก่3.jpg', 'image', NULL, '4ff39e12-2923-4ba8-9e00-dd9152866917', '2026-03-30 19:20:00.913', NULL, NULL, NULL, NULL, 947);
INSERT INTO "public"."Uploads" VALUES (624, 'ตง.ถ.2-0083 ถนนห้วยยอด ซอยบ่อนไก่4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0083 ถนนห้วยยอด ซอยบ่อนไก่4.jpg', 'image', NULL, 'fd0d92b3-0fa4-49db-b0e7-9714f79252d2', '2026-03-30 19:20:00.914', NULL, NULL, NULL, NULL, 947);
INSERT INTO "public"."Uploads" VALUES (625, 'ตง.ถ.2-0083 ถนนห้วยยอด ซอยบ่อนไก่5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0083 ถนนห้วยยอด ซอยบ่อนไก่5.jpg', 'image', NULL, 'bc375d1a-f95a-4808-b58c-a210da6287aa', '2026-03-30 19:20:00.915', NULL, NULL, NULL, NULL, 947);
INSERT INTO "public"."Uploads" VALUES (626, 'ตง.ถ.2-0083 ถนนห้วยยอด ซอยบ่อนไก่6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0083 ถนนห้วยยอด ซอยบ่อนไก่6.jpg', 'image', NULL, '10fb94ff-b36e-4af1-a664-bbddb5ceb4de', '2026-03-30 19:20:00.915', NULL, NULL, NULL, NULL, 947);
INSERT INTO "public"."Uploads" VALUES (627, 'ตง.ถ.2-0083 ถนนห้วยยอด ซอยบ่อนไก่7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0083 ถนนห้วยยอด ซอยบ่อนไก่7.jpg', 'image', NULL, '535aa7d2-a55d-45f1-9c6a-44f31054045e', '2026-03-30 19:20:00.916', NULL, NULL, NULL, NULL, 947);
INSERT INTO "public"."Uploads" VALUES (628, 'ตง.ถ.2-0084 ถนนห้วยยอด ซอยสิงห์ทอง1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0084 ถนนห้วยยอด ซอยสิงห์ทอง1.jpg', 'image', NULL, '2f778946-128e-44a8-b5cc-395c0b4155c2', '2026-03-30 19:20:00.917', NULL, NULL, NULL, NULL, 948);
INSERT INTO "public"."Uploads" VALUES (629, 'ตง.ถ.2-0084 ถนนห้วยยอด ซอยสิงห์ทอง2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0084 ถนนห้วยยอด ซอยสิงห์ทอง2.jpg', 'image', NULL, '1da13eb9-4a8d-4ebe-835c-422c04f1c59e', '2026-03-30 19:20:00.918', NULL, NULL, NULL, NULL, 948);
INSERT INTO "public"."Uploads" VALUES (630, 'ตง.ถ.2-0084 ถนนห้วยยอด ซอยสิงห์ทอง3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0084 ถนนห้วยยอด ซอยสิงห์ทอง3.jpg', 'image', NULL, '0a2e9b37-046e-4025-bc95-ac0db7bdfb42', '2026-03-30 19:20:00.918', NULL, NULL, NULL, NULL, 948);
INSERT INTO "public"."Uploads" VALUES (631, 'ตง.ถ.2-0084 ถนนห้วยยอด ซอยสิงห์ทอง4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0084 ถนนห้วยยอด ซอยสิงห์ทอง4.jpg', 'image', NULL, '4f4ea988-b5a7-4388-965f-cbbd53f8c8d0', '2026-03-30 19:20:00.919', NULL, NULL, NULL, NULL, 948);
INSERT INTO "public"."Uploads" VALUES (632, 'ตง.ถ.2-0084 ถนนห้วยยอด ซอยสิงห์ทอง5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0084 ถนนห้วยยอด ซอยสิงห์ทอง5.jpg', 'image', NULL, '5c665c82-9d5f-4290-933c-97920c80bb26', '2026-03-30 19:20:00.92', NULL, NULL, NULL, NULL, 948);
INSERT INTO "public"."Uploads" VALUES (633, 'ตง.ถ.2-0084 ถนนห้วยยอด ซอยสิงห์ทอง6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0084 ถนนห้วยยอด ซอยสิงห์ทอง6.jpg', 'image', NULL, 'a6739934-4cb2-4e6a-a58f-aefa272d5fdc', '2026-03-30 19:20:00.92', NULL, NULL, NULL, NULL, 948);
INSERT INTO "public"."Uploads" VALUES (634, 'ตง.ถ.2-0084 ถนนห้วยยอด ซอยสิงห์ทอง7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0084 ถนนห้วยยอด ซอยสิงห์ทอง7.jpg', 'image', NULL, '2d04e01e-abc0-4d51-860f-bfd291b321c7', '2026-03-30 19:20:00.921', NULL, NULL, NULL, NULL, 948);
INSERT INTO "public"."Uploads" VALUES (635, 'ตง.ถ.2-0085 ถนนพัทลุง ซอย 11.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0085 ถนนพัทลุง ซอย 11.jpg', 'image', NULL, '123cf10a-d86d-4e10-a2fb-8562adcc0cac', '2026-03-30 19:20:00.921', NULL, NULL, NULL, NULL, 949);
INSERT INTO "public"."Uploads" VALUES (636, 'ตง.ถ.2-0085 ถนนพัทลุง ซอย 12.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0085 ถนนพัทลุง ซอย 12.jpg', 'image', NULL, '8cf8a470-e6a1-4923-8a03-d4e5ce1d9194', '2026-03-30 19:20:00.922', NULL, NULL, NULL, NULL, 949);
INSERT INTO "public"."Uploads" VALUES (637, 'ตง.ถ.2-0085 ถนนพัทลุง ซอย 13.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0085 ถนนพัทลุง ซอย 13.jpg', 'image', NULL, '970f570a-9114-440c-bcea-def640aef186', '2026-03-30 19:20:00.922', NULL, NULL, NULL, NULL, 949);
INSERT INTO "public"."Uploads" VALUES (638, 'ตง.ถ.2-0085 ถนนพัทลุง ซอย 14.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0085 ถนนพัทลุง ซอย 14.jpg', 'image', NULL, 'a6ab1c28-86d5-42b1-85bd-fe379e6432a1', '2026-03-30 19:20:00.923', NULL, NULL, NULL, NULL, 949);
INSERT INTO "public"."Uploads" VALUES (639, 'ตง.ถ.2-0085 ถนนพัทลุง ซอย 15.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0085 ถนนพัทลุง ซอย 15.jpg', 'image', NULL, '3f1f303b-d228-4950-b1ec-df61d127b3df', '2026-03-30 19:20:00.924', NULL, NULL, NULL, NULL, 949);
INSERT INTO "public"."Uploads" VALUES (640, 'ตง.ถ.2-0085 ถนนพัทลุง ซอย 16.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0085 ถนนพัทลุง ซอย 16.jpg', 'image', NULL, 'f8d65c79-0065-4b8b-a35b-3821d88a94b5', '2026-03-30 19:20:00.925', NULL, NULL, NULL, NULL, 949);
INSERT INTO "public"."Uploads" VALUES (641, 'ตง.ถ.2-0085 ถนนพัทลุง ซอย 17.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0085 ถนนพัทลุง ซอย 17.jpg', 'image', NULL, 'a82849f5-cd55-4a6e-8ce5-a2f571a7fdcb', '2026-03-30 19:20:00.925', NULL, NULL, NULL, NULL, 949);
INSERT INTO "public"."Uploads" VALUES (642, 'ตง.ถ.2-0085 ถนนพัทลุง ซอย 18.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0085 ถนนพัทลุง ซอย 18.jpg', 'image', NULL, '0464ed06-6f3f-427b-b24d-768ef36d10ea', '2026-03-30 19:20:00.926', NULL, NULL, NULL, NULL, 949);
INSERT INTO "public"."Uploads" VALUES (643, 'ตง.ถ.2-0085 ถนนพัทลุง ซอย 19.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0085 ถนนพัทลุง ซอย 19.jpg', 'image', NULL, '99007d69-333f-47b2-b645-450203d8b14a', '2026-03-30 19:20:00.927', NULL, NULL, NULL, NULL, 949);
INSERT INTO "public"."Uploads" VALUES (644, 'ตง.ถ.2-0086 ถนนพัทลุง ซอย 31.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0086 ถนนพัทลุง ซอย 31.jpg', 'image', NULL, 'd5853552-40db-4fd8-b9a5-6d8d2fd8b47c', '2026-03-30 19:20:00.927', NULL, NULL, NULL, NULL, 950);
INSERT INTO "public"."Uploads" VALUES (645, 'ตง.ถ.2-0086 ถนนพัทลุง ซอย 32.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0086 ถนนพัทลุง ซอย 32.jpg', 'image', NULL, '8cb71bc1-7ca8-4776-bca4-cd390af7d63d', '2026-03-30 19:20:00.928', NULL, NULL, NULL, NULL, 950);
INSERT INTO "public"."Uploads" VALUES (646, 'ตง.ถ.2-0086 ถนนพัทลุง ซอย 33.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0086 ถนนพัทลุง ซอย 33.jpg', 'image', NULL, '91275f79-d270-4b25-8a96-9e0a9076c13f', '2026-03-30 19:20:00.928', NULL, NULL, NULL, NULL, 950);
INSERT INTO "public"."Uploads" VALUES (647, 'ตง.ถ.2-0086 ถนนพัทลุง ซอย 34.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0086 ถนนพัทลุง ซอย 34.jpg', 'image', NULL, '7f8d8d2b-a01b-4aa7-bca9-f951228bd2b8', '2026-03-30 19:20:00.929', NULL, NULL, NULL, NULL, 950);
INSERT INTO "public"."Uploads" VALUES (648, 'ตง.ถ.2-0086 ถนนพัทลุง ซอย 35.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0086 ถนนพัทลุง ซอย 35.jpg', 'image', NULL, '58ce375e-0769-4a73-9695-8eab164144e0', '2026-03-30 19:20:00.929', NULL, NULL, NULL, NULL, 950);
INSERT INTO "public"."Uploads" VALUES (649, 'ตง.ถ.2-0086 ถนนพัทลุง ซอย 36.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0086 ถนนพัทลุง ซอย 36.jpg', 'image', NULL, '39feee74-1330-426a-a52d-7bbcc4ec2b03', '2026-03-30 19:20:00.93', NULL, NULL, NULL, NULL, 950);
INSERT INTO "public"."Uploads" VALUES (650, 'ตง.ถ.2-0086 ถนนพัทลุง ซอย 37.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0086 ถนนพัทลุง ซอย 37.jpg', 'image', NULL, 'c160e94d-e32d-4682-ad4c-083db435a5dc', '2026-03-30 19:20:00.931', NULL, NULL, NULL, NULL, 950);
INSERT INTO "public"."Uploads" VALUES (357, 'ตง.ถ.2-0045 ถนนกันตังซอย 84.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0045 ถนนกันตังซอย 84.jpg', 'image', NULL, 'ac0a6c03-b05f-4705-829a-a2f0221b8bb7', '2026-03-30 19:20:00.748', NULL, NULL, NULL, NULL, 909);
INSERT INTO "public"."Uploads" VALUES (651, 'ตง.ถ.2-0086 ถนนพัทลุง ซอย 38.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0086 ถนนพัทลุง ซอย 38.jpg', 'image', NULL, '3b448ef4-34d8-49b1-9f74-f1621307bfb1', '2026-03-30 19:20:00.931', NULL, NULL, NULL, NULL, 950);
INSERT INTO "public"."Uploads" VALUES (652, 'ตง.ถ.2-0086 ถนนพัทลุง ซอย 39.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0086 ถนนพัทลุง ซอย 39.jpg', 'image', NULL, '4a66b1d0-3b7d-47ef-8ca8-fc93481229b6', '2026-03-30 19:20:00.932', NULL, NULL, NULL, NULL, 950);
INSERT INTO "public"."Uploads" VALUES (653, 'ตง.ถ.2-0087 ถนนประชาอุทิศ1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0087 ถนนประชาอุทิศ1.jpg', 'image', NULL, 'a00bf405-6a76-40ce-81d0-cab102c0cc95', '2026-03-30 19:20:00.933', NULL, NULL, NULL, NULL, 951);
INSERT INTO "public"."Uploads" VALUES (654, 'ตง.ถ.2-0087 ถนนประชาอุทิศ2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0087 ถนนประชาอุทิศ2.jpg', 'image', NULL, 'd9151030-44ad-47ad-a694-e61ca713a0d6', '2026-03-30 19:20:00.933', NULL, NULL, NULL, NULL, 951);
INSERT INTO "public"."Uploads" VALUES (655, 'ตง.ถ.2-0087 ถนนประชาอุทิศ3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0087 ถนนประชาอุทิศ3.jpg', 'image', NULL, '38c902d1-cafb-41b2-9238-55109e177231', '2026-03-30 19:20:00.934', NULL, NULL, NULL, NULL, 951);
INSERT INTO "public"."Uploads" VALUES (656, 'ตง.ถ.2-0087 ถนนประชาอุทิศ4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0087 ถนนประชาอุทิศ4.jpg', 'image', NULL, '75698fe7-a958-4c76-bf68-afcf03b32c5f', '2026-03-30 19:20:00.934', NULL, NULL, NULL, NULL, 951);
INSERT INTO "public"."Uploads" VALUES (657, 'ตง.ถ.2-0087 ถนนประชาอุทิศ5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0087 ถนนประชาอุทิศ5.jpg', 'image', NULL, '9f3bfe50-fde2-47d3-855d-2bc62d651ab1', '2026-03-30 19:20:00.935', NULL, NULL, NULL, NULL, 951);
INSERT INTO "public"."Uploads" VALUES (658, 'ตง.ถ.2-0087 ถนนประชาอุทิศ6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0087 ถนนประชาอุทิศ6.jpg', 'image', NULL, '4221a45c-bbf9-4e2e-b328-6a9a391ec63f', '2026-03-30 19:20:00.935', NULL, NULL, NULL, NULL, 951);
INSERT INTO "public"."Uploads" VALUES (659, 'ตง.ถ.2-0087 ถนนประชาอุทิศ7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0087 ถนนประชาอุทิศ7.jpg', 'image', NULL, '2f9d3b22-d79f-4f7f-9f16-4d9df5be6ed9', '2026-03-30 19:20:00.936', NULL, NULL, NULL, NULL, 951);
INSERT INTO "public"."Uploads" VALUES (660, 'ตง.ถ.2-0087 ถนนประชาอุทิศ8.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0087 ถนนประชาอุทิศ8.jpg', 'image', NULL, 'feca5171-22e2-45ac-92fd-70b3b26b9469', '2026-03-30 19:20:00.936', NULL, NULL, NULL, NULL, 951);
INSERT INTO "public"."Uploads" VALUES (661, 'ตง.ถ.2-0087 ถนนประชาอุทิศ9.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0087 ถนนประชาอุทิศ9.jpg', 'image', NULL, '2f1263ac-4448-4c17-a0d7-ba0399e6e147', '2026-03-30 19:20:00.937', NULL, NULL, NULL, NULL, 951);
INSERT INTO "public"."Uploads" VALUES (662, 'ตง.ถ.2-0088 ถนนพัทลุง ซอย 41.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0088 ถนนพัทลุง ซอย 41.jpg', 'image', NULL, 'fcbb0db6-a3ab-454d-bcc0-bf703432d127', '2026-03-30 19:20:00.938', NULL, NULL, NULL, NULL, 952);
INSERT INTO "public"."Uploads" VALUES (663, 'ตง.ถ.2-0088 ถนนพัทลุง ซอย 42.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0088 ถนนพัทลุง ซอย 42.jpg', 'image', NULL, '445912a4-1523-4520-839b-fa5c14f4f43f', '2026-03-30 19:20:00.938', NULL, NULL, NULL, NULL, 952);
INSERT INTO "public"."Uploads" VALUES (664, 'ตง.ถ.2-0088 ถนนพัทลุง ซอย 43.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0088 ถนนพัทลุง ซอย 43.jpg', 'image', NULL, '8124edf4-fcbe-4fdd-827b-6fbaaaaef340', '2026-03-30 19:20:00.939', NULL, NULL, NULL, NULL, 952);
INSERT INTO "public"."Uploads" VALUES (665, 'ตง.ถ.2-0088 ถนนพัทลุง ซอย 44.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0088 ถนนพัทลุง ซอย 44.jpg', 'image', NULL, 'a1fa2b48-e1c2-4fbc-a8fb-758affc3c759', '2026-03-30 19:20:00.94', NULL, NULL, NULL, NULL, 952);
INSERT INTO "public"."Uploads" VALUES (666, 'ตง.ถ.2-0088 ถนนพัทลุง ซอย 45.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0088 ถนนพัทลุง ซอย 45.jpg', 'image', NULL, '6e884192-70c0-4ca9-bd87-2e19d63b66d4', '2026-03-30 19:20:00.94', NULL, NULL, NULL, NULL, 952);
INSERT INTO "public"."Uploads" VALUES (667, 'ตง.ถ.2-0088 ถนนพัทลุง ซอย 46.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0088 ถนนพัทลุง ซอย 46.jpg', 'image', NULL, '70567ad4-26c5-452f-9fe2-4984c4a7a975', '2026-03-30 19:20:00.941', NULL, NULL, NULL, NULL, 952);
INSERT INTO "public"."Uploads" VALUES (668, 'ตง.ถ.2-0088 ถนนพัทลุง ซอย 47.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0088 ถนนพัทลุง ซอย 47.jpg', 'image', NULL, '05674a6a-8fac-492a-a886-701a52f36cbe', '2026-03-30 19:20:00.941', NULL, NULL, NULL, NULL, 952);
INSERT INTO "public"."Uploads" VALUES (669, 'ตง.ถ.2-0088 ถนนพัทลุง ซอย 48.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0088 ถนนพัทลุง ซอย 48.jpg', 'image', NULL, 'ad3dbd5d-7b2d-4d48-b740-3d355ea29bc3', '2026-03-30 19:20:00.942', NULL, NULL, NULL, NULL, 952);
INSERT INTO "public"."Uploads" VALUES (670, 'ตง.ถ.2-0088 ถนนพัทลุง ซอย 49.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0088 ถนนพัทลุง ซอย 49.jpg', 'image', NULL, 'bf8a4f0b-b018-48f9-91ae-832d79b017be', '2026-03-30 19:20:00.942', NULL, NULL, NULL, NULL, 952);
INSERT INTO "public"."Uploads" VALUES (671, 'ตง.ถ.2-0089 ถนนพัทลุง ซอย 51.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0089 ถนนพัทลุง ซอย 51.jpg', 'image', NULL, '9342a448-07b4-4ab2-994c-41fc61bab442', '2026-03-30 19:20:00.943', NULL, NULL, NULL, NULL, 953);
INSERT INTO "public"."Uploads" VALUES (672, 'ตง.ถ.2-0089 ถนนพัทลุง ซอย 52.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0089 ถนนพัทลุง ซอย 52.jpg', 'image', NULL, '1e45bb5e-27f9-4557-b7af-76731c6b97c2', '2026-03-30 19:20:00.944', NULL, NULL, NULL, NULL, 953);
INSERT INTO "public"."Uploads" VALUES (673, 'ตง.ถ.2-0089 ถนนพัทลุง ซอย 53.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0089 ถนนพัทลุง ซอย 53.jpg', 'image', NULL, '9d579b23-afc3-4fde-bd0f-a1f31d666a9b', '2026-03-30 19:20:00.945', NULL, NULL, NULL, NULL, 953);
INSERT INTO "public"."Uploads" VALUES (674, 'ตง.ถ.2-0089 ถนนพัทลุง ซอย 54.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0089 ถนนพัทลุง ซอย 54.jpg', 'image', NULL, '5d7746ad-f797-4a3a-bbd2-787514c5833c', '2026-03-30 19:20:00.945', NULL, NULL, NULL, NULL, 953);
INSERT INTO "public"."Uploads" VALUES (675, 'ตง.ถ.2-0089 ถนนพัทลุง ซอย 55.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0089 ถนนพัทลุง ซอย 55.jpg', 'image', NULL, '822981f9-98a0-42aa-8e41-f8bc3179ee09', '2026-03-30 19:20:00.946', NULL, NULL, NULL, NULL, 953);
INSERT INTO "public"."Uploads" VALUES (676, 'ตง.ถ.2-0089 ถนนพัทลุง ซอย 56.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0089 ถนนพัทลุง ซอย 56.jpg', 'image', NULL, '1d201dd8-abca-425b-acee-0cae4c969e6e', '2026-03-30 19:20:00.947', NULL, NULL, NULL, NULL, 953);
INSERT INTO "public"."Uploads" VALUES (677, 'ตง.ถ.2-0089 ถนนพัทลุง ซอย 57.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0089 ถนนพัทลุง ซอย 57.jpg', 'image', NULL, 'd52330b6-e95c-409a-93b8-c60f5202c895', '2026-03-30 19:20:00.948', NULL, NULL, NULL, NULL, 953);
INSERT INTO "public"."Uploads" VALUES (678, 'ตง.ถ.2-0089 ถนนพัทลุง ซอย 58.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0089 ถนนพัทลุง ซอย 58.jpg', 'image', NULL, 'afe31cea-31cf-498d-8501-8e9237c6801d', '2026-03-30 19:20:00.948', NULL, NULL, NULL, NULL, 953);
INSERT INTO "public"."Uploads" VALUES (679, 'ตง.ถ.2-0089 ถนนพัทลุง ซอย 59.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0089 ถนนพัทลุง ซอย 59.jpg', 'image', NULL, 'fba2f286-ba6a-4e13-89ae-c0a2a82100e4', '2026-03-30 19:20:00.949', NULL, NULL, NULL, NULL, 953);
INSERT INTO "public"."Uploads" VALUES (680, 'ตง.ถ.2-0090 ถนนพัทลุง ซอย 61.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0090 ถนนพัทลุง ซอย 61.jpg', 'image', NULL, '0d354e26-9749-4c90-aab7-387adde9c52b', '2026-03-30 19:20:00.949', NULL, NULL, NULL, NULL, 954);
INSERT INTO "public"."Uploads" VALUES (681, 'ตง.ถ.2-0090 ถนนพัทลุง ซอย 62.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0090 ถนนพัทลุง ซอย 62.jpg', 'image', NULL, '6d913100-72a2-4471-9ea2-0a8ab88ef013', '2026-03-30 19:20:00.95', NULL, NULL, NULL, NULL, 954);
INSERT INTO "public"."Uploads" VALUES (682, 'ตง.ถ.2-0090 ถนนพัทลุง ซอย 63.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0090 ถนนพัทลุง ซอย 63.jpg', 'image', NULL, 'b853dfbe-5a7e-49d2-b7e6-eb9a6dba84a0', '2026-03-30 19:20:00.95', NULL, NULL, NULL, NULL, 954);
INSERT INTO "public"."Uploads" VALUES (683, 'ตง.ถ.2-0090 ถนนพัทลุง ซอย 64.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0090 ถนนพัทลุง ซอย 64.jpg', 'image', NULL, 'b5bc8275-7089-4ac3-8372-d082f3492afe', '2026-03-30 19:20:00.951', NULL, NULL, NULL, NULL, 954);
INSERT INTO "public"."Uploads" VALUES (684, 'ตง.ถ.2-0090 ถนนพัทลุง ซอย 65.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0090 ถนนพัทลุง ซอย 65.jpg', 'image', NULL, '255c11a9-4927-4eee-9d16-1eb6eeb43ff3', '2026-03-30 19:20:00.951', NULL, NULL, NULL, NULL, 954);
INSERT INTO "public"."Uploads" VALUES (685, 'ตง.ถ.2-0090 ถนนพัทลุง ซอย 66.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0090 ถนนพัทลุง ซอย 66.jpg', 'image', NULL, 'f4d31686-d1d4-42b3-a681-99e08c74241e', '2026-03-30 19:20:00.952', NULL, NULL, NULL, NULL, 954);
INSERT INTO "public"."Uploads" VALUES (686, 'ตง.ถ.2-0090 ถนนพัทลุง ซอย 67.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0090 ถนนพัทลุง ซอย 67.jpg', 'image', NULL, 'dcf67280-c008-4933-b95e-9319bdab088b', '2026-03-30 19:20:00.953', NULL, NULL, NULL, NULL, 954);
INSERT INTO "public"."Uploads" VALUES (687, 'ตง.ถ.2-0090 ถนนพัทลุง ซอย 68.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0090 ถนนพัทลุง ซอย 68.jpg', 'image', NULL, '94c339e4-7de9-41fc-93b2-92d8131ef817', '2026-03-30 19:20:00.954', NULL, NULL, NULL, NULL, 954);
INSERT INTO "public"."Uploads" VALUES (688, 'ตง.ถ.2-0090 ถนนพัทลุง ซอย 69.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0090 ถนนพัทลุง ซอย 69.jpg', 'image', NULL, 'f2656e68-59e9-439f-b4a1-923ca5869fcb', '2026-03-30 19:20:00.954', NULL, NULL, NULL, NULL, 954);
INSERT INTO "public"."Uploads" VALUES (693, 'ตง.ถ.2-0091 ถนนพัทลุง ซอย75.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0091 ถนนพัทลุง ซอย75.jpg', 'image', NULL, '3580eee3-435c-4f99-816c-dc3945a20bc2', '2026-03-30 19:20:00.957', NULL, NULL, NULL, NULL, 955);
INSERT INTO "public"."Uploads" VALUES (689, 'ตง.ถ.2-0091 ถนนพัทลุง ซอย71.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0091 ถนนพัทลุง ซอย71.jpg', 'image', NULL, '9088c8d7-8ed2-4783-9d67-d8d54cc73ffc', '2026-03-30 19:20:00.955', NULL, NULL, NULL, NULL, 955);
INSERT INTO "public"."Uploads" VALUES (690, 'ตง.ถ.2-0091 ถนนพัทลุง ซอย72.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0091 ถนนพัทลุง ซอย72.jpg', 'image', NULL, '89bdecb4-62b7-4502-9559-240ae0ea8716', '2026-03-30 19:20:00.955', NULL, NULL, NULL, NULL, 955);
INSERT INTO "public"."Uploads" VALUES (691, 'ตง.ถ.2-0091 ถนนพัทลุง ซอย73.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0091 ถนนพัทลุง ซอย73.jpg', 'image', NULL, 'c9a4650d-8ef4-4a05-aaaa-27d97aa672f5', '2026-03-30 19:20:00.956', NULL, NULL, NULL, NULL, 955);
INSERT INTO "public"."Uploads" VALUES (692, 'ตง.ถ.2-0091 ถนนพัทลุง ซอย74.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0091 ถนนพัทลุง ซอย74.jpg', 'image', NULL, '891058da-ab09-482a-9595-af7299c0fc74', '2026-03-30 19:20:00.957', NULL, NULL, NULL, NULL, 955);
INSERT INTO "public"."Uploads" VALUES (694, 'ตง.ถ.2-0091 ถนนพัทลุง ซอย76.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0091 ถนนพัทลุง ซอย76.jpg', 'image', NULL, '235b8039-41e8-446d-81b8-6aefed059a5b', '2026-03-30 19:20:00.958', NULL, NULL, NULL, NULL, 955);
INSERT INTO "public"."Uploads" VALUES (695, 'ตง.ถ.2-0091 ถนนพัทลุง ซอย77.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0091 ถนนพัทลุง ซอย77.jpg', 'image', NULL, '4eaac2e3-2d19-4c1e-b845-e461e34fcdf8', '2026-03-30 19:20:00.961', NULL, NULL, NULL, NULL, 955);
INSERT INTO "public"."Uploads" VALUES (696, 'ตง.ถ.2-0091 ถนนพัทลุง ซอย78.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0091 ถนนพัทลุง ซอย78.jpg', 'image', NULL, '6d949989-92d5-4a31-bfd6-23c88267db03', '2026-03-30 19:20:00.962', NULL, NULL, NULL, NULL, 955);
INSERT INTO "public"."Uploads" VALUES (697, 'ตง.ถ.2-0091 ถนนพัทลุง ซอย79.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0091 ถนนพัทลุง ซอย79.jpg', 'image', NULL, 'b4eea9fe-969a-4b91-9930-0ef2033cb878', '2026-03-30 19:20:00.962', NULL, NULL, NULL, NULL, 955);
INSERT INTO "public"."Uploads" VALUES (698, 'ตง.ถ.2-0092 ถนนพัทลุง ซอย 91.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0092 ถนนพัทลุง ซอย 91.jpg', 'image', NULL, '48bc2588-a2b6-48d6-9739-e188ba1aad96', '2026-03-30 19:20:00.963', NULL, NULL, NULL, NULL, 956);
INSERT INTO "public"."Uploads" VALUES (699, 'ตง.ถ.2-0092 ถนนพัทลุง ซอย 92.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0092 ถนนพัทลุง ซอย 92.jpg', 'image', NULL, 'da0731df-44a1-4ae1-bbed-aa88684ad1d3', '2026-03-30 19:20:00.963', NULL, NULL, NULL, NULL, 956);
INSERT INTO "public"."Uploads" VALUES (700, 'ตง.ถ.2-0092 ถนนพัทลุง ซอย 93.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0092 ถนนพัทลุง ซอย 93.jpg', 'image', NULL, '55c62a96-6ffe-46a5-96cb-02a8dd623c27', '2026-03-30 19:20:00.964', NULL, NULL, NULL, NULL, 956);
INSERT INTO "public"."Uploads" VALUES (701, 'ตง.ถ.2-0092 ถนนพัทลุง ซอย 94.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0092 ถนนพัทลุง ซอย 94.jpg', 'image', NULL, '7554f396-1a42-4ab5-8d95-4ac14f530820', '2026-03-30 19:20:00.964', NULL, NULL, NULL, NULL, 956);
INSERT INTO "public"."Uploads" VALUES (702, 'ตง.ถ.2-0092 ถนนพัทลุง ซอย 95.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0092 ถนนพัทลุง ซอย 95.jpg', 'image', NULL, '9a142bd6-d901-4f5e-bd04-00cc18ae602a', '2026-03-30 19:20:00.965', NULL, NULL, NULL, NULL, 956);
INSERT INTO "public"."Uploads" VALUES (703, 'ตง.ถ.2-0092 ถนนพัทลุง ซอย 96.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0092 ถนนพัทลุง ซอย 96.jpg', 'image', NULL, 'c6c6f289-13ec-4e20-984c-e999a4c39c21', '2026-03-30 19:20:00.966', NULL, NULL, NULL, NULL, 956);
INSERT INTO "public"."Uploads" VALUES (704, 'ตง.ถ.2-0092 ถนนพัทลุง ซอย 97.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0092 ถนนพัทลุง ซอย 97.jpg', 'image', NULL, 'd6cebd7f-9dcf-41a9-8b6f-23c27c9a756b', '2026-03-30 19:20:00.967', NULL, NULL, NULL, NULL, 956);
INSERT INTO "public"."Uploads" VALUES (705, 'ตง.ถ.2-0092 ถนนพัทลุง ซอย 98.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0092 ถนนพัทลุง ซอย 98.jpg', 'image', NULL, 'bcc3d875-81e2-4a8e-ad72-243f59cf28a9', '2026-03-30 19:20:00.967', NULL, NULL, NULL, NULL, 956);
INSERT INTO "public"."Uploads" VALUES (706, 'ตง.ถ.2-0092 ถนนพัทลุง ซอย 99.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0092 ถนนพัทลุง ซอย 99.jpg', 'image', NULL, '3f28700b-57fc-43dd-b416-db4cae7079ab', '2026-03-30 19:20:00.968', NULL, NULL, NULL, NULL, 956);
INSERT INTO "public"."Uploads" VALUES (707, 'ตง.ถ.2-0093 ถนนพัทลุง ซอย 111.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0093 ถนนพัทลุง ซอย 111.jpg', 'image', NULL, 'e72b68a1-f690-44b4-be5a-b2a3c4d0cb5e', '2026-03-30 19:20:00.968', NULL, NULL, NULL, NULL, 957);
INSERT INTO "public"."Uploads" VALUES (708, 'ตง.ถ.2-0093 ถนนพัทลุง ซอย 112.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0093 ถนนพัทลุง ซอย 112.jpg', 'image', NULL, 'fe13333c-2f95-485d-8e12-bf435189483c', '2026-03-30 19:20:00.969', NULL, NULL, NULL, NULL, 957);
INSERT INTO "public"."Uploads" VALUES (709, 'ตง.ถ.2-0093 ถนนพัทลุง ซอย 113.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0093 ถนนพัทลุง ซอย 113.jpg', 'image', NULL, 'dfc2f104-a942-4938-97ef-23efc5ae6502', '2026-03-30 19:20:00.969', NULL, NULL, NULL, NULL, 957);
INSERT INTO "public"."Uploads" VALUES (710, 'ตง.ถ.2-0093 ถนนพัทลุง ซอย 114.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0093 ถนนพัทลุง ซอย 114.jpg', 'image', NULL, '2d7784e8-097a-44ba-8ea6-e7cd2614f645', '2026-03-30 19:20:00.97', NULL, NULL, NULL, NULL, 957);
INSERT INTO "public"."Uploads" VALUES (358, 'ตง.ถ.2-0045 ถนนกันตังซอย 85.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0045 ถนนกันตังซอย 85.jpg', 'image', NULL, '8b119c7d-057b-4021-98ec-3a4dcc6598e8', '2026-03-30 19:20:00.749', NULL, NULL, NULL, NULL, 909);
INSERT INTO "public"."Uploads" VALUES (711, 'ตง.ถ.2-0093 ถนนพัทลุง ซอย 115.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0093 ถนนพัทลุง ซอย 115.jpg', 'image', NULL, '91f899ea-2787-4279-8bd4-ebb692345090', '2026-03-30 19:20:00.97', NULL, NULL, NULL, NULL, 957);
INSERT INTO "public"."Uploads" VALUES (712, 'ตง.ถ.2-0093 ถนนพัทลุง ซอย 116.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0093 ถนนพัทลุง ซอย 116.jpg', 'image', NULL, '0ee1567f-5318-4d46-88b2-7bd6999c4dd3', '2026-03-30 19:20:00.971', NULL, NULL, NULL, NULL, 957);
INSERT INTO "public"."Uploads" VALUES (713, 'ตง.ถ.2-0093 ถนนพัทลุง ซอย 117.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0093 ถนนพัทลุง ซอย 117.jpg', 'image', NULL, 'a4c7a00a-9e5a-43a5-b59d-76991cf42eda', '2026-03-30 19:20:00.972', NULL, NULL, NULL, NULL, 957);
INSERT INTO "public"."Uploads" VALUES (714, 'ตง.ถ.2-0093 ถนนพัทลุง ซอย 118.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0093 ถนนพัทลุง ซอย 118.jpg', 'image', NULL, '11a3228d-a9e7-4cd0-ae1a-e14b1cb2f8bc', '2026-03-30 19:20:00.973', NULL, NULL, NULL, NULL, 957);
INSERT INTO "public"."Uploads" VALUES (715, 'ตง.ถ.2-0093 ถนนพัทลุง ซอย 119.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0093 ถนนพัทลุง ซอย 119.jpg', 'image', NULL, 'e61c80fc-7755-41ab-9db4-b8eb456b70e2', '2026-03-30 19:20:00.973', NULL, NULL, NULL, NULL, 957);
INSERT INTO "public"."Uploads" VALUES (716, 'ตง.ถ.2-0094 ถนนพัทลุง ซอยข้างร้านAM.PM1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0094 ถนนพัทลุง ซอยข้างร้านAM.PM1.jpg', 'image', NULL, '83a71e7f-ca98-477e-9582-d0632ff5b0a5', '2026-03-30 19:20:00.974', NULL, NULL, NULL, NULL, 958);
INSERT INTO "public"."Uploads" VALUES (717, 'ตง.ถ.2-0094 ถนนพัทลุง ซอยข้างร้านAM.PM2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0094 ถนนพัทลุง ซอยข้างร้านAM.PM2.jpg', 'image', NULL, 'f6c113c6-286c-425a-baed-0a6e2216d988', '2026-03-30 19:20:00.975', NULL, NULL, NULL, NULL, 958);
INSERT INTO "public"."Uploads" VALUES (718, 'ตง.ถ.2-0094 ถนนพัทลุง ซอยข้างร้านAM.PM3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0094 ถนนพัทลุง ซอยข้างร้านAM.PM3.jpg', 'image', NULL, 'c1d3e9ce-db89-4021-9507-06f3e8f5eecd', '2026-03-30 19:20:00.976', NULL, NULL, NULL, NULL, 958);
INSERT INTO "public"."Uploads" VALUES (719, 'ตง.ถ.2-0094 ถนนพัทลุง ซอยข้างร้านAM.PM4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0094 ถนนพัทลุง ซอยข้างร้านAM.PM4.jpg', 'image', NULL, 'ad5e0ecd-2b43-4922-be14-a4bf45df8718', '2026-03-30 19:20:00.976', NULL, NULL, NULL, NULL, 958);
INSERT INTO "public"."Uploads" VALUES (720, 'ตง.ถ.2-0094 ถนนพัทลุง ซอยข้างร้านAM.PM5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0094 ถนนพัทลุง ซอยข้างร้านAM.PM5.jpg', 'image', NULL, '1f83e2dd-cd9c-4d9a-9f2a-de7029ae1a1b', '2026-03-30 19:20:00.977', NULL, NULL, NULL, NULL, 958);
INSERT INTO "public"."Uploads" VALUES (721, 'ตง.ถ.2-0094 ถนนพัทลุง ซอยข้างร้านAM.PM6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0094 ถนนพัทลุง ซอยข้างร้านAM.PM6.jpg', 'image', NULL, '021c76db-e84b-4c93-aac5-9aff88359fc9', '2026-03-30 19:20:00.977', NULL, NULL, NULL, NULL, 958);
INSERT INTO "public"."Uploads" VALUES (722, 'ตง.ถ.2-0094 ถนนพัทลุง ซอยข้างร้านAM.PM7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0094 ถนนพัทลุง ซอยข้างร้านAM.PM7.jpg', 'image', NULL, 'a554bbac-dc3b-4126-b55c-60d926c017ed', '2026-03-30 19:20:00.978', NULL, NULL, NULL, NULL, 958);
INSERT INTO "public"."Uploads" VALUES (723, 'ตง.ถ.2-0094 ถนนพัทลุง ซอยข้างร้านAM.PM8.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0094 ถนนพัทลุง ซอยข้างร้านAM.PM8.jpg', 'image', NULL, '81a08b84-2191-4259-8b6d-2bc66dfa37aa', '2026-03-30 19:20:00.979', NULL, NULL, NULL, NULL, 958);
INSERT INTO "public"."Uploads" VALUES (724, 'ตง.ถ.2-0094 ถนนพัทลุง ซอยข้างร้านAM.PM9.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0094 ถนนพัทลุง ซอยข้างร้านAM.PM9.jpg', 'image', NULL, '8512a0f0-ef9c-42c1-acb0-90d653b750b8', '2026-03-30 19:20:00.98', NULL, NULL, NULL, NULL, 958);
INSERT INTO "public"."Uploads" VALUES (725, 'ตง.ถ.2-0095 ถนนบางรัก ซอย 21.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0095 ถนนบางรัก ซอย 21.jpg', 'image', NULL, '775f68db-ff8d-476c-b4f3-596b7a6a1263', '2026-03-30 19:20:00.98', NULL, NULL, NULL, NULL, 959);
INSERT INTO "public"."Uploads" VALUES (726, 'ตง.ถ.2-0095 ถนนบางรัก ซอย 22.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0095 ถนนบางรัก ซอย 22.jpg', 'image', NULL, '967593d7-e2ac-4c1d-b79e-7d1600f14457', '2026-03-30 19:20:00.981', NULL, NULL, NULL, NULL, 959);
INSERT INTO "public"."Uploads" VALUES (727, 'ตง.ถ.2-0095 ถนนบางรัก ซอย 23.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0095 ถนนบางรัก ซอย 23.jpg', 'image', NULL, '45ed84b1-7986-44f5-be2a-0bb9bff81e4a', '2026-03-30 19:20:00.982', NULL, NULL, NULL, NULL, 959);
INSERT INTO "public"."Uploads" VALUES (728, 'ตง.ถ.2-0095 ถนนบางรัก ซอย 24.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0095 ถนนบางรัก ซอย 24.jpg', 'image', NULL, 'ac931fe6-de50-4e4b-ac53-fc379bbbda8a', '2026-03-30 19:20:00.982', NULL, NULL, NULL, NULL, 959);
INSERT INTO "public"."Uploads" VALUES (729, 'ตง.ถ.2-0095 ถนนบางรัก ซอย 25.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0095 ถนนบางรัก ซอย 25.jpg', 'image', NULL, '04f460fd-92ff-44e2-91c4-f79415f26d69', '2026-03-30 19:20:00.983', NULL, NULL, NULL, NULL, 959);
INSERT INTO "public"."Uploads" VALUES (730, 'ตง.ถ.2-0095 ถนนบางรัก ซอย 26.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0095 ถนนบางรัก ซอย 26.jpg', 'image', NULL, '26307b7d-cedf-46dd-8b0d-127f5a6c3a75', '2026-03-30 19:20:00.983', NULL, NULL, NULL, NULL, 959);
INSERT INTO "public"."Uploads" VALUES (731, 'ตง.ถ.2-0095 ถนนบางรัก ซอย 27.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0095 ถนนบางรัก ซอย 27.jpg', 'image', NULL, 'ac71bfff-1ce3-49c9-bad5-0fa3c3f2b3f3', '2026-03-30 19:20:00.984', NULL, NULL, NULL, NULL, 959);
INSERT INTO "public"."Uploads" VALUES (732, 'ตง.ถ.2-0095 ถนนบางรัก ซอย 28.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0095 ถนนบางรัก ซอย 28.jpg', 'image', NULL, '911dc74d-3f47-4917-a244-652c7f0da791', '2026-03-30 19:20:00.984', NULL, NULL, NULL, NULL, 959);
INSERT INTO "public"."Uploads" VALUES (733, 'ตง.ถ.2-0095 ถนนบางรัก ซอย 29.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0095 ถนนบางรัก ซอย 29.jpg', 'image', NULL, '6961bfa9-8614-4a38-868b-be066e7b32f2', '2026-03-30 19:20:00.985', NULL, NULL, NULL, NULL, 959);
INSERT INTO "public"."Uploads" VALUES (734, 'ตง.ถ.2-0096 ถนนบางรัก ซอย 31.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0096 ถนนบางรัก ซอย 31.jpg', 'image', NULL, '02178e90-9d30-4d57-93f2-3729871724a3', '2026-03-30 19:20:00.986', NULL, NULL, NULL, NULL, 960);
INSERT INTO "public"."Uploads" VALUES (735, 'ตง.ถ.2-0096 ถนนบางรัก ซอย 32.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0096 ถนนบางรัก ซอย 32.jpg', 'image', NULL, '49d909bf-1e00-4d3a-a9ed-fe0d847447ae', '2026-03-30 19:20:00.986', NULL, NULL, NULL, NULL, 960);
INSERT INTO "public"."Uploads" VALUES (736, 'ตง.ถ.2-0096 ถนนบางรัก ซอย 33.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0096 ถนนบางรัก ซอย 33.jpg', 'image', NULL, 'ce55c2fb-f663-4804-bceb-bef5baccb3c5', '2026-03-30 19:20:00.988', NULL, NULL, NULL, NULL, 960);
INSERT INTO "public"."Uploads" VALUES (737, 'ตง.ถ.2-0096 ถนนบางรัก ซอย 34.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0096 ถนนบางรัก ซอย 34.jpg', 'image', NULL, 'de181590-6bff-48ed-b662-57801416e7c9', '2026-03-30 19:20:00.988', NULL, NULL, NULL, NULL, 960);
INSERT INTO "public"."Uploads" VALUES (738, 'ตง.ถ.2-0096 ถนนบางรัก ซอย 35.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0096 ถนนบางรัก ซอย 35.jpg', 'image', NULL, '1547b40c-3b0f-4e61-bde0-7eb2c827aba5', '2026-03-30 19:20:00.989', NULL, NULL, NULL, NULL, 960);
INSERT INTO "public"."Uploads" VALUES (739, 'ตง.ถ.2-0096 ถนนบางรัก ซอย 36.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0096 ถนนบางรัก ซอย 36.jpg', 'image', NULL, 'a4b04918-9268-4cc3-bca6-9c2ec8b6c797', '2026-03-30 19:20:00.99', NULL, NULL, NULL, NULL, 960);
INSERT INTO "public"."Uploads" VALUES (740, 'ตง.ถ.2-0096 ถนนบางรัก ซอย 37.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0096 ถนนบางรัก ซอย 37.jpg', 'image', NULL, '18e165c2-3dac-42ee-aa10-473236998855', '2026-03-30 19:20:00.99', NULL, NULL, NULL, NULL, 960);
INSERT INTO "public"."Uploads" VALUES (741, 'ตง.ถ.2-0096 ถนนบางรัก ซอย 38.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0096 ถนนบางรัก ซอย 38.jpg', 'image', NULL, '1141ad05-feac-42a2-851a-61a6c44bfd68', '2026-03-30 19:20:00.991', NULL, NULL, NULL, NULL, 960);
INSERT INTO "public"."Uploads" VALUES (742, 'ตง.ถ.2-0096 ถนนบางรัก ซอย 39.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0096 ถนนบางรัก ซอย 39.jpg', 'image', NULL, '893c82bc-3d79-4ea9-ac5e-882f1d92111e', '2026-03-30 19:20:00.991', NULL, NULL, NULL, NULL, 960);
INSERT INTO "public"."Uploads" VALUES (743, 'ตง.ถ.2-0097 ถนนบางรัก ซอย 41.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0097 ถนนบางรัก ซอย 41.jpg', 'image', NULL, '16dae952-855a-470b-8d49-69d3f7c750b6', '2026-03-30 19:20:00.992', NULL, NULL, NULL, NULL, 961);
INSERT INTO "public"."Uploads" VALUES (744, 'ตง.ถ.2-0097 ถนนบางรัก ซอย 42.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0097 ถนนบางรัก ซอย 42.jpg', 'image', NULL, '9183cbf1-c03c-4ba8-a752-efcbf962a109', '2026-03-30 19:20:00.993', NULL, NULL, NULL, NULL, 961);
INSERT INTO "public"."Uploads" VALUES (745, 'ตง.ถ.2-0097 ถนนบางรัก ซอย 43.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0097 ถนนบางรัก ซอย 43.jpg', 'image', NULL, 'a1da024d-f9c5-4a98-8e26-92b88c721bfd', '2026-03-30 19:20:00.993', NULL, NULL, NULL, NULL, 961);
INSERT INTO "public"."Uploads" VALUES (746, 'ตง.ถ.2-0097 ถนนบางรัก ซอย 44.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0097 ถนนบางรัก ซอย 44.jpg', 'image', NULL, '9e740709-9d3a-4ffe-b89f-123b09bd458f', '2026-03-30 19:20:00.994', NULL, NULL, NULL, NULL, 961);
INSERT INTO "public"."Uploads" VALUES (747, 'ตง.ถ.2-0097 ถนนบางรัก ซอย 45.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0097 ถนนบางรัก ซอย 45.jpg', 'image', NULL, '95257f81-b28a-4bc5-81e3-f4bc5278e81f', '2026-03-30 19:20:00.995', NULL, NULL, NULL, NULL, 961);
INSERT INTO "public"."Uploads" VALUES (748, 'ตง.ถ.2-0097 ถนนบางรัก ซอย 46.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0097 ถนนบางรัก ซอย 46.jpg', 'image', NULL, '53e90510-e8d0-48e0-9a1d-661f1551b4ae', '2026-03-30 19:20:00.995', NULL, NULL, NULL, NULL, 961);
INSERT INTO "public"."Uploads" VALUES (749, 'ตง.ถ.2-0097 ถนนบางรัก ซอย 47.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0097 ถนนบางรัก ซอย 47.jpg', 'image', NULL, 'cd936ae5-0270-47bc-9c71-189c07886707', '2026-03-30 19:20:00.996', NULL, NULL, NULL, NULL, 961);
INSERT INTO "public"."Uploads" VALUES (750, 'ตง.ถ.2-0097 ถนนบางรัก ซอย 48.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0097 ถนนบางรัก ซอย 48.jpg', 'image', NULL, 'bfc503e9-013c-4b45-a446-075d7889ad3c', '2026-03-30 19:20:00.996', NULL, NULL, NULL, NULL, 961);
INSERT INTO "public"."Uploads" VALUES (751, 'ตง.ถ.2-0097 ถนนบางรัก ซอย 49.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0097 ถนนบางรัก ซอย 49.jpg', 'image', NULL, '57216079-b72a-4e7b-9005-0aa558a2e494', '2026-03-30 19:20:00.997', NULL, NULL, NULL, NULL, 961);
INSERT INTO "public"."Uploads" VALUES (752, 'ตง.ถ.2-0098 ถนนบางรัก ซอย 51.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0098 ถนนบางรัก ซอย 51.jpg', 'image', NULL, 'c5d957df-50a1-4b29-beaf-babba62bc9f0', '2026-03-30 19:20:00.997', NULL, NULL, NULL, NULL, 962);
INSERT INTO "public"."Uploads" VALUES (753, 'ตง.ถ.2-0098 ถนนบางรัก ซอย 52.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0098 ถนนบางรัก ซอย 52.jpg', 'image', NULL, '676b666d-ebc3-427b-999e-98f25526d9ca', '2026-03-30 19:20:00.998', NULL, NULL, NULL, NULL, 962);
INSERT INTO "public"."Uploads" VALUES (754, 'ตง.ถ.2-0098 ถนนบางรัก ซอย 53.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0098 ถนนบางรัก ซอย 53.jpg', 'image', NULL, 'b133054b-54be-4b9e-899a-d05052a3cf7c', '2026-03-30 19:20:00.998', NULL, NULL, NULL, NULL, 962);
INSERT INTO "public"."Uploads" VALUES (755, 'ตง.ถ.2-0098 ถนนบางรัก ซอย 54.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0098 ถนนบางรัก ซอย 54.jpg', 'image', NULL, '47ce742a-cb06-48d0-985d-51b359018b67', '2026-03-30 19:20:00.999', NULL, NULL, NULL, NULL, 962);
INSERT INTO "public"."Uploads" VALUES (756, 'ตง.ถ.2-0098 ถนนบางรัก ซอย 55.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0098 ถนนบางรัก ซอย 55.jpg', 'image', NULL, 'f2ab5bb4-9fcf-4c3d-8d3e-cd80bde1569f', '2026-03-30 19:20:01', NULL, NULL, NULL, NULL, 962);
INSERT INTO "public"."Uploads" VALUES (757, 'ตง.ถ.2-0098 ถนนบางรัก ซอย 56.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0098 ถนนบางรัก ซอย 56.jpg', 'image', NULL, 'd98665ed-e63b-4431-8913-ea1ef09abec3', '2026-03-30 19:20:01.001', NULL, NULL, NULL, NULL, 962);
INSERT INTO "public"."Uploads" VALUES (758, 'ตง.ถ.2-0098 ถนนบางรัก ซอย 57.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0098 ถนนบางรัก ซอย 57.jpg', 'image', NULL, '24b87980-bf9c-4bb9-8b93-ddebf04d4beb', '2026-03-30 19:20:01.002', NULL, NULL, NULL, NULL, 962);
INSERT INTO "public"."Uploads" VALUES (759, 'ตง.ถ.2-0098 ถนนบางรัก ซอย 58.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0098 ถนนบางรัก ซอย 58.jpg', 'image', NULL, 'f348a13f-89d8-40fa-8337-8fc15a0941c9', '2026-03-30 19:20:01.003', NULL, NULL, NULL, NULL, 962);
INSERT INTO "public"."Uploads" VALUES (760, 'ตง.ถ.2-0098 ถนนบางรัก ซอย 59.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0098 ถนนบางรัก ซอย 59.jpg', 'image', NULL, '039392f5-b4c5-4416-a9f0-756eca5839d7', '2026-03-30 19:20:01.003', NULL, NULL, NULL, NULL, 962);
INSERT INTO "public"."Uploads" VALUES (761, 'ตง.ถ.2-0099 ถนนบางรัก ซอย 61.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0099 ถนนบางรัก ซอย 61.jpg', 'image', NULL, '1353a77c-4279-49a4-980f-3d5593f2a63c', '2026-03-30 19:20:01.003', NULL, NULL, NULL, NULL, 963);
INSERT INTO "public"."Uploads" VALUES (762, 'ตง.ถ.2-0099 ถนนบางรัก ซอย 62.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0099 ถนนบางรัก ซอย 62.jpg', 'image', NULL, '835a238d-35ee-411a-9c3b-02cd5d70b161', '2026-03-30 19:20:01.004', NULL, NULL, NULL, NULL, 963);
INSERT INTO "public"."Uploads" VALUES (763, 'ตง.ถ.2-0099 ถนนบางรัก ซอย 63.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0099 ถนนบางรัก ซอย 63.jpg', 'image', NULL, '73ed1a18-63c9-4fea-ae0b-ea1f750ebf2e', '2026-03-30 19:20:01.005', NULL, NULL, NULL, NULL, 963);
INSERT INTO "public"."Uploads" VALUES (764, 'ตง.ถ.2-0099 ถนนบางรัก ซอย 64.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0099 ถนนบางรัก ซอย 64.jpg', 'image', NULL, 'b90abb3a-5001-4cbb-b422-a82c602fb33a', '2026-03-30 19:20:01.005', NULL, NULL, NULL, NULL, 963);
INSERT INTO "public"."Uploads" VALUES (765, 'ตง.ถ.2-0099 ถนนบางรัก ซอย 65.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0099 ถนนบางรัก ซอย 65.jpg', 'image', NULL, '23af4237-6e92-4b3b-b114-9c59c5fc763e', '2026-03-30 19:20:01.006', NULL, NULL, NULL, NULL, 963);
INSERT INTO "public"."Uploads" VALUES (766, 'ตง.ถ.2-0099 ถนนบางรัก ซอย 66.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0099 ถนนบางรัก ซอย 66.jpg', 'image', NULL, 'b6d9e93d-5a33-414b-ae31-7670bd6dc23a', '2026-03-30 19:20:01.007', NULL, NULL, NULL, NULL, 963);
INSERT INTO "public"."Uploads" VALUES (767, 'ตง.ถ.2-0099 ถนนบางรัก ซอย 67.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0099 ถนนบางรัก ซอย 67.jpg', 'image', NULL, '37f99428-59fe-48d2-ac95-09a3c0153653', '2026-03-30 19:20:01.008', NULL, NULL, NULL, NULL, 963);
INSERT INTO "public"."Uploads" VALUES (768, 'ตง.ถ.2-0099 ถนนบางรัก ซอย 68.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0099 ถนนบางรัก ซอย 68.jpg', 'image', NULL, '76fe4d1d-ce98-46c1-9211-0f7b42d7cfb3', '2026-03-30 19:20:01.008', NULL, NULL, NULL, NULL, 963);
INSERT INTO "public"."Uploads" VALUES (769, 'ตง.ถ.2-0099 ถนนบางรัก ซอย 69.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0099 ถนนบางรัก ซอย 69.jpg', 'image', NULL, 'e036575d-8d1d-4d7e-b991-d18a7f1433f3', '2026-03-30 19:20:01.009', NULL, NULL, NULL, NULL, 963);
INSERT INTO "public"."Uploads" VALUES (770, 'ตง.ถ.2-0100 ถนนบางรัก ซอยข้างบ้านเลขที่ 381.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0100 ถนนบางรัก ซอยข้างบ้านเลขที่ 381.jpg', 'image', NULL, 'a916b801-afac-4b07-994f-67377f6c120b', '2026-03-30 19:20:01.01', NULL, NULL, NULL, NULL, 964);
INSERT INTO "public"."Uploads" VALUES (771, 'ตง.ถ.2-0100 ถนนบางรัก ซอยข้างบ้านเลขที่ 382.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0100 ถนนบางรัก ซอยข้างบ้านเลขที่ 382.jpg', 'image', NULL, 'bc302353-1ffa-454a-aba8-02e22dec12d0', '2026-03-30 19:20:01.01', NULL, NULL, NULL, NULL, 964);
INSERT INTO "public"."Uploads" VALUES (772, 'ตง.ถ.2-0100 ถนนบางรัก ซอยข้างบ้านเลขที่ 383.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0100 ถนนบางรัก ซอยข้างบ้านเลขที่ 383.jpg', 'image', NULL, '71d68838-aaee-483f-b4cc-eaabb06f431a', '2026-03-30 19:20:01.011', NULL, NULL, NULL, NULL, 964);
INSERT INTO "public"."Uploads" VALUES (773, 'ตง.ถ.2-0100 ถนนบางรัก ซอยข้างบ้านเลขที่ 384.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0100 ถนนบางรัก ซอยข้างบ้านเลขที่ 384.jpg', 'image', NULL, '14bc99ef-d18c-48af-867b-0f73c73235f3', '2026-03-30 19:20:01.011', NULL, NULL, NULL, NULL, 964);
INSERT INTO "public"."Uploads" VALUES (774, 'ตง.ถ.2-0100 ถนนบางรัก ซอยข้างบ้านเลขที่ 385.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0100 ถนนบางรัก ซอยข้างบ้านเลขที่ 385.jpg', 'image', NULL, '47857f2b-6e1e-46fc-93b2-4556a47a7635', '2026-03-30 19:20:01.012', NULL, NULL, NULL, NULL, 964);
INSERT INTO "public"."Uploads" VALUES (775, 'ตง.ถ.2-0100 ถนนบางรัก ซอยข้างบ้านเลขที่ 386.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0100 ถนนบางรัก ซอยข้างบ้านเลขที่ 386.jpg', 'image', NULL, 'fb0c8ded-025c-4040-8700-0bd765d2be03', '2026-03-30 19:20:01.02', NULL, NULL, NULL, NULL, 964);
INSERT INTO "public"."Uploads" VALUES (776, 'ตง.ถ.2-0100 ถนนบางรัก ซอยข้างบ้านเลขที่ 387.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0100 ถนนบางรัก ซอยข้างบ้านเลขที่ 387.jpg', 'image', NULL, '4cacd3b0-1bf4-4096-82f8-d065d1a3bcdd', '2026-03-30 19:20:01.021', NULL, NULL, NULL, NULL, 964);
INSERT INTO "public"."Uploads" VALUES (777, 'ตง.ถ.2-0100 ถนนบางรัก ซอยข้างบ้านเลขที่ 388.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0100 ถนนบางรัก ซอยข้างบ้านเลขที่ 388.jpg', 'image', NULL, '12ca62f0-0870-4bf3-a8e5-ebe11ceb0dbb', '2026-03-30 19:20:01.022', NULL, NULL, NULL, NULL, 964);
INSERT INTO "public"."Uploads" VALUES (778, 'ตง.ถ.2-0100 ถนนบางรัก ซอยข้างบ้านเลขที่ 389.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0100 ถนนบางรัก ซอยข้างบ้านเลขที่ 389.jpg', 'image', NULL, 'a700f31b-c82e-46bb-990d-55cd103a4666', '2026-03-30 19:20:01.023', NULL, NULL, NULL, NULL, 964);
INSERT INTO "public"."Uploads" VALUES (779, 'ตง.ถ.2-0101 ถนนจริงจิตร ซอย 21.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0101 ถนนจริงจิตร ซอย 21.jpg', 'image', NULL, '545255c0-0143-4f38-b7cd-6329a7d709fe', '2026-03-30 19:20:01.024', NULL, NULL, NULL, NULL, 965);
INSERT INTO "public"."Uploads" VALUES (780, 'ตง.ถ.2-0101 ถนนจริงจิตร ซอย 22.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0101 ถนนจริงจิตร ซอย 22.jpg', 'image', NULL, '154583ea-7bbd-403a-acb9-116b57266961', '2026-03-30 19:20:01.024', NULL, NULL, NULL, NULL, 965);
INSERT INTO "public"."Uploads" VALUES (781, 'ตง.ถ.2-0101 ถนนจริงจิตร ซอย 23.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0101 ถนนจริงจิตร ซอย 23.jpg', 'image', NULL, '8fc1aed5-3cec-432d-93b6-98fb470adf66', '2026-03-30 19:20:01.025', NULL, NULL, NULL, NULL, 965);
INSERT INTO "public"."Uploads" VALUES (782, 'ตง.ถ.2-0101 ถนนจริงจิตร ซอย 24.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0101 ถนนจริงจิตร ซอย 24.jpg', 'image', NULL, '5be108f0-94c0-4f87-b0e6-6117df2606b2', '2026-03-30 19:20:01.025', NULL, NULL, NULL, NULL, 965);
INSERT INTO "public"."Uploads" VALUES (783, 'ตง.ถ.2-0101 ถนนจริงจิตร ซอย 25.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0101 ถนนจริงจิตร ซอย 25.jpg', 'image', NULL, 'bed37770-5e1a-47aa-a10c-737a0a6e05e4', '2026-03-30 19:20:01.026', NULL, NULL, NULL, NULL, 965);
INSERT INTO "public"."Uploads" VALUES (784, 'ตง.ถ.2-0101 ถนนจริงจิตร ซอย 26.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0101 ถนนจริงจิตร ซอย 26.jpg', 'image', NULL, '0c711e8f-52b1-4b0d-8cad-51ca26d96e9a', '2026-03-30 19:20:01.026', NULL, NULL, NULL, NULL, 965);
INSERT INTO "public"."Uploads" VALUES (785, 'ตง.ถ.2-0101 ถนนจริงจิตร ซอย 27.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0101 ถนนจริงจิตร ซอย 27.jpg', 'image', NULL, 'a52e5648-7c22-4d62-aad2-81b987234152', '2026-03-30 19:20:01.027', NULL, NULL, NULL, NULL, 965);
INSERT INTO "public"."Uploads" VALUES (786, 'ตง.ถ.2-0101 ถนนจริงจิตร ซอย 28.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0101 ถนนจริงจิตร ซอย 28.jpg', 'image', NULL, '895eb5b2-8d15-40e0-a999-2272abebb7b1', '2026-03-30 19:20:01.028', NULL, NULL, NULL, NULL, 965);
INSERT INTO "public"."Uploads" VALUES (787, 'ตง.ถ.2-0101 ถนนจริงจิตร ซอย 29.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0101 ถนนจริงจิตร ซอย 29.jpg', 'image', NULL, 'aca52b4d-a1ef-4109-bfe6-6f5949779a69', '2026-03-30 19:20:01.029', NULL, NULL, NULL, NULL, 965);
INSERT INTO "public"."Uploads" VALUES (788, 'ตง.ถ.2-0102 ถนนจริงจิตร ซอย 41.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0102 ถนนจริงจิตร ซอย 41.jpg', 'image', NULL, '7200ae68-7a89-4517-8d40-409cf9c1241b', '2026-03-30 19:20:01.029', NULL, NULL, NULL, NULL, 966);
INSERT INTO "public"."Uploads" VALUES (789, 'ตง.ถ.2-0102 ถนนจริงจิตร ซอย 42.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0102 ถนนจริงจิตร ซอย 42.jpg', 'image', NULL, '9dc62b76-efd6-4e6a-a529-2b660de1c981', '2026-03-30 19:20:01.03', NULL, NULL, NULL, NULL, 966);
INSERT INTO "public"."Uploads" VALUES (790, 'ตง.ถ.2-0102 ถนนจริงจิตร ซอย 43.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0102 ถนนจริงจิตร ซอย 43.jpg', 'image', NULL, 'feebae09-eda9-444e-aa48-4593573978db', '2026-03-30 19:20:01.031', NULL, NULL, NULL, NULL, 966);
INSERT INTO "public"."Uploads" VALUES (791, 'ตง.ถ.2-0102 ถนนจริงจิตร ซอย 44.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0102 ถนนจริงจิตร ซอย 44.jpg', 'image', NULL, '3395ef17-f1d9-4e18-a76b-548dceb0f468', '2026-03-30 19:20:01.031', NULL, NULL, NULL, NULL, 966);
INSERT INTO "public"."Uploads" VALUES (792, 'ตง.ถ.2-0102 ถนนจริงจิตร ซอย 45.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0102 ถนนจริงจิตร ซอย 45.jpg', 'image', NULL, '6d6e413c-ee3d-44af-a24e-036f83abdd69', '2026-03-30 19:20:01.032', NULL, NULL, NULL, NULL, 966);
INSERT INTO "public"."Uploads" VALUES (793, 'ตง.ถ.2-0102 ถนนจริงจิตร ซอย 46.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0102 ถนนจริงจิตร ซอย 46.jpg', 'image', NULL, '9a1ba52c-a061-400f-b292-4d9c33eafd0c', '2026-03-30 19:20:01.032', NULL, NULL, NULL, NULL, 966);
INSERT INTO "public"."Uploads" VALUES (794, 'ตง.ถ.2-0102 ถนนจริงจิตร ซอย 47.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0102 ถนนจริงจิตร ซอย 47.jpg', 'image', NULL, '9154d63f-1b06-4ecb-99d9-0907e978ee1c', '2026-03-30 19:20:01.033', NULL, NULL, NULL, NULL, 966);
INSERT INTO "public"."Uploads" VALUES (795, 'ตง.ถ.2-0102 ถนนจริงจิตร ซอย 48.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0102 ถนนจริงจิตร ซอย 48.jpg', 'image', NULL, '02c287a5-86c5-47f6-b56a-5e21fabf2866', '2026-03-30 19:20:01.033', NULL, NULL, NULL, NULL, 966);
INSERT INTO "public"."Uploads" VALUES (796, 'ตง.ถ.2-0102 ถนนจริงจิตร ซอย 49.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0102 ถนนจริงจิตร ซอย 49.jpg', 'image', NULL, '096e0c79-6110-4831-9b9c-b9569455aa8d', '2026-03-30 19:20:01.034', NULL, NULL, NULL, NULL, 966);
INSERT INTO "public"."Uploads" VALUES (797, 'ตง.ถ.2-0103 ถนนจริงจิตร ซอยพล.ต.ต.สมพร1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0103 ถนนจริงจิตร ซอยพล.ต.ต.สมพร1.jpg', 'image', NULL, '86e36acc-7dda-4778-951f-9d69c1d9b89a', '2026-03-30 19:20:01.035', NULL, NULL, NULL, NULL, 967);
INSERT INTO "public"."Uploads" VALUES (798, 'ตง.ถ.2-0103 ถนนจริงจิตร ซอยพล.ต.ต.สมพร2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0103 ถนนจริงจิตร ซอยพล.ต.ต.สมพร2.jpg', 'image', NULL, '9344a1de-0f25-4bec-bd1d-a62c643b327b', '2026-03-30 19:20:01.036', NULL, NULL, NULL, NULL, 967);
INSERT INTO "public"."Uploads" VALUES (799, 'ตง.ถ.2-0103 ถนนจริงจิตร ซอยพล.ต.ต.สมพร3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0103 ถนนจริงจิตร ซอยพล.ต.ต.สมพร3.jpg', 'image', NULL, '8b781d4f-7de6-49c6-a7fa-8733914c8d75', '2026-03-30 19:20:01.036', NULL, NULL, NULL, NULL, 967);
INSERT INTO "public"."Uploads" VALUES (800, 'ตง.ถ.2-0103 ถนนจริงจิตร ซอยพล.ต.ต.สมพร4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0103 ถนนจริงจิตร ซอยพล.ต.ต.สมพร4.jpg', 'image', NULL, '671e64cb-6592-478a-b768-4a9ac9bb6da2', '2026-03-30 19:20:01.037', NULL, NULL, NULL, NULL, 967);
INSERT INTO "public"."Uploads" VALUES (801, 'ตง.ถ.2-0103 ถนนจริงจิตร ซอยพล.ต.ต.สมพร5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0103 ถนนจริงจิตร ซอยพล.ต.ต.สมพร5.jpg', 'image', NULL, '26c4540e-1557-4db0-baea-1ab9ec30ba7c', '2026-03-30 19:20:01.038', NULL, NULL, NULL, NULL, 967);
INSERT INTO "public"."Uploads" VALUES (802, 'ตง.ถ.2-0103 ถนนจริงจิตร ซอยพล.ต.ต.สมพร6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0103 ถนนจริงจิตร ซอยพล.ต.ต.สมพร6.jpg', 'image', NULL, '05527438-cc89-4507-883a-c9c2f9cc49b7', '2026-03-30 19:20:01.038', NULL, NULL, NULL, NULL, 967);
INSERT INTO "public"."Uploads" VALUES (803, 'ตง.ถ.2-0103 ถนนจริงจิตร ซอยพล.ต.ต.สมพร7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0103 ถนนจริงจิตร ซอยพล.ต.ต.สมพร7.jpg', 'image', NULL, 'a86b30c5-afd8-4222-88bd-c39dccd7a0cd', '2026-03-30 19:20:01.039', NULL, NULL, NULL, NULL, 967);
INSERT INTO "public"."Uploads" VALUES (804, 'ตง.ถ.2-0103 ถนนจริงจิตร ซอยพล.ต.ต.สมพร8.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0103 ถนนจริงจิตร ซอยพล.ต.ต.สมพร8.jpg', 'image', NULL, '6dc667c3-265e-430a-8e91-d30cf51b9539', '2026-03-30 19:20:01.039', NULL, NULL, NULL, NULL, 967);
INSERT INTO "public"."Uploads" VALUES (805, 'ตง.ถ.2-0103 ถนนจริงจิตร ซอยพล.ต.ต.สมพร9.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0103 ถนนจริงจิตร ซอยพล.ต.ต.สมพร9.jpg', 'image', NULL, '08dbeab3-5bc3-4144-b82d-d9d49c37fc35', '2026-03-30 19:20:01.04', NULL, NULL, NULL, NULL, 967);
INSERT INTO "public"."Uploads" VALUES (806, 'ตง.ถ.2-0104 ถนนรักษ์จันทร ซอย 11.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0104 ถนนรักษ์จันทร ซอย 11.jpg', 'image', NULL, '5c31c05d-b639-4fb1-a825-71a72ea3ac02', '2026-03-30 19:20:01.04', NULL, NULL, NULL, NULL, 968);
INSERT INTO "public"."Uploads" VALUES (807, 'ตง.ถ.2-0104 ถนนรักษ์จันทร ซอย 12.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0104 ถนนรักษ์จันทร ซอย 12.jpg', 'image', NULL, '4ec61631-3eb2-448b-ab45-d962b1c2b4aa', '2026-03-30 19:20:01.041', NULL, NULL, NULL, NULL, 968);
INSERT INTO "public"."Uploads" VALUES (808, 'ตง.ถ.2-0104 ถนนรักษ์จันทร ซอย 13.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0104 ถนนรักษ์จันทร ซอย 13.jpg', 'image', NULL, 'a2e62bbd-b122-452e-94e4-df3df4420124', '2026-03-30 19:20:01.041', NULL, NULL, NULL, NULL, 968);
INSERT INTO "public"."Uploads" VALUES (809, 'ตง.ถ.2-0104 ถนนรักษ์จันทร ซอย 14.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0104 ถนนรักษ์จันทร ซอย 14.jpg', 'image', NULL, 'b72e8a82-8ee0-4dd6-b79d-bcefd80b5ff6', '2026-03-30 19:20:01.042', NULL, NULL, NULL, NULL, 968);
INSERT INTO "public"."Uploads" VALUES (810, 'ตง.ถ.2-0104 ถนนรักษ์จันทร ซอย 15.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0104 ถนนรักษ์จันทร ซอย 15.jpg', 'image', NULL, '646a996c-8f4d-4eee-bb62-36ac428f126a', '2026-03-30 19:20:01.043', NULL, NULL, NULL, NULL, 968);
INSERT INTO "public"."Uploads" VALUES (811, 'ตง.ถ.2-0104 ถนนรักษ์จันทร ซอย 16.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0104 ถนนรักษ์จันทร ซอย 16.jpg', 'image', NULL, '348a4599-d517-4eac-9969-cb4843a88650', '2026-03-30 19:20:01.044', NULL, NULL, NULL, NULL, 968);
INSERT INTO "public"."Uploads" VALUES (812, 'ตง.ถ.2-0104 ถนนรักษ์จันทร ซอย 17.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0104 ถนนรักษ์จันทร ซอย 17.jpg', 'image', NULL, '04c5ca64-43e4-4cd9-a23e-af610efbb33c', '2026-03-30 19:20:01.044', NULL, NULL, NULL, NULL, 968);
INSERT INTO "public"."Uploads" VALUES (813, 'ตง.ถ.2-0104 ถนนรักษ์จันทร ซอย 18.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0104 ถนนรักษ์จันทร ซอย 18.jpg', 'image', NULL, '51eb8427-e1b9-43bd-8e33-de0f98856c20', '2026-03-30 19:20:01.045', NULL, NULL, NULL, NULL, 968);
INSERT INTO "public"."Uploads" VALUES (814, 'ตง.ถ.2-0104 ถนนรักษ์จันทร ซอย 19.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0104 ถนนรักษ์จันทร ซอย 19.jpg', 'image', NULL, '5d019517-89cd-452f-b449-fbe598c6cc83', '2026-03-30 19:20:01.045', NULL, NULL, NULL, NULL, 968);
INSERT INTO "public"."Uploads" VALUES (815, 'ตง.ถ.2-0105 ถนนรักษ์จันทร ซอย 21.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0105 ถนนรักษ์จันทร ซอย 21.jpg', 'image', NULL, '7b3b5804-2f17-464d-a264-b7c5727c16a6', '2026-03-30 19:20:01.046', NULL, NULL, NULL, NULL, 969);
INSERT INTO "public"."Uploads" VALUES (816, 'ตง.ถ.2-0105 ถนนรักษ์จันทร ซอย 22.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0105 ถนนรักษ์จันทร ซอย 22.jpg', 'image', NULL, 'e1b7f98b-0434-4cb0-8154-74a27202dbf5', '2026-03-30 19:20:01.046', NULL, NULL, NULL, NULL, 969);
INSERT INTO "public"."Uploads" VALUES (817, 'ตง.ถ.2-0105 ถนนรักษ์จันทร ซอย 23.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0105 ถนนรักษ์จันทร ซอย 23.jpg', 'image', NULL, '12de14a6-2e48-437d-9ab6-099574d5a1e9', '2026-03-30 19:20:01.047', NULL, NULL, NULL, NULL, 969);
INSERT INTO "public"."Uploads" VALUES (818, 'ตง.ถ.2-0105 ถนนรักษ์จันทร ซอย 24.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0105 ถนนรักษ์จันทร ซอย 24.jpg', 'image', NULL, 'c8be24b2-f1f0-411a-8816-be8f103b94d2', '2026-03-30 19:20:01.048', NULL, NULL, NULL, NULL, 969);
INSERT INTO "public"."Uploads" VALUES (819, 'ตง.ถ.2-0105 ถนนรักษ์จันทร ซอย 25.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0105 ถนนรักษ์จันทร ซอย 25.jpg', 'image', NULL, '7dbf0177-94a9-4d5a-b108-d480475703ba', '2026-03-30 19:20:01.048', NULL, NULL, NULL, NULL, 969);
INSERT INTO "public"."Uploads" VALUES (820, 'ตง.ถ.2-0105 ถนนรักษ์จันทร ซอย 26.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0105 ถนนรักษ์จันทร ซอย 26.jpg', 'image', NULL, '7b2946da-24d3-406d-aaf6-8a942aaec79b', '2026-03-30 19:20:01.049', NULL, NULL, NULL, NULL, 969);
INSERT INTO "public"."Uploads" VALUES (821, 'ตง.ถ.2-0105 ถนนรักษ์จันทร ซอย 27.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0105 ถนนรักษ์จันทร ซอย 27.jpg', 'image', NULL, 'efeee506-d457-49a6-a2a7-428c40db3fe8', '2026-03-30 19:20:01.05', NULL, NULL, NULL, NULL, 969);
INSERT INTO "public"."Uploads" VALUES (822, 'ตง.ถ.2-0105 ถนนรักษ์จันทร ซอย 28.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0105 ถนนรักษ์จันทร ซอย 28.jpg', 'image', NULL, '1beea3a5-00ed-43ce-9ba5-26bd325c4c29', '2026-03-30 19:20:01.051', NULL, NULL, NULL, NULL, 969);
INSERT INTO "public"."Uploads" VALUES (823, 'ตง.ถ.2-0105 ถนนรักษ์จันทร ซอย 29.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0105 ถนนรักษ์จันทร ซอย 29.jpg', 'image', NULL, '7c64b0e0-af7e-451d-90b3-cf98aeb5b80f', '2026-03-30 19:20:01.051', NULL, NULL, NULL, NULL, 969);
INSERT INTO "public"."Uploads" VALUES (824, 'ตง.ถ.2-0106 ถนนรักษ์จันทน์ ซอย 31.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0106 ถนนรักษ์จันทน์ ซอย 31.jpg', 'image', NULL, 'a19910c8-a5e2-473c-8f3e-167c85e04610', '2026-03-30 19:20:01.052', NULL, NULL, NULL, NULL, 970);
INSERT INTO "public"."Uploads" VALUES (825, 'ตง.ถ.2-0106 ถนนรักษ์จันทน์ ซอย 32.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0106 ถนนรักษ์จันทน์ ซอย 32.jpg', 'image', NULL, 'e531ec0f-9133-49ba-a7be-d4d2c053b853', '2026-03-30 19:20:01.052', NULL, NULL, NULL, NULL, 970);
INSERT INTO "public"."Uploads" VALUES (826, 'ตง.ถ.2-0106 ถนนรักษ์จันทน์ ซอย 33.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0106 ถนนรักษ์จันทน์ ซอย 33.jpg', 'image', NULL, '010ac836-74ee-4c72-835e-807adcfc2d86', '2026-03-30 19:20:01.053', NULL, NULL, NULL, NULL, 970);
INSERT INTO "public"."Uploads" VALUES (827, 'ตง.ถ.2-0106 ถนนรักษ์จันทน์ ซอย 34.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0106 ถนนรักษ์จันทน์ ซอย 34.jpg', 'image', NULL, '4d87da36-e213-434a-a41c-6d9a3d6df6b7', '2026-03-30 19:20:01.053', NULL, NULL, NULL, NULL, 970);
INSERT INTO "public"."Uploads" VALUES (828, 'ตง.ถ.2-0106 ถนนรักษ์จันทน์ ซอย 35.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0106 ถนนรักษ์จันทน์ ซอย 35.jpg', 'image', NULL, '46a687c0-6677-40e7-9934-78ffc94129cb', '2026-03-30 19:20:01.053', NULL, NULL, NULL, NULL, 970);
INSERT INTO "public"."Uploads" VALUES (829, 'ตง.ถ.2-0106 ถนนรักษ์จันทน์ ซอย 36.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0106 ถนนรักษ์จันทน์ ซอย 36.jpg', 'image', NULL, 'f1d16b06-e78f-46f3-8b02-32efee24bb67', '2026-03-30 19:20:01.054', NULL, NULL, NULL, NULL, 970);
INSERT INTO "public"."Uploads" VALUES (830, 'ตง.ถ.2-0106 ถนนรักษ์จันทน์ ซอย 37.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0106 ถนนรักษ์จันทน์ ซอย 37.jpg', 'image', NULL, 'c3c7bb8c-0841-4b0f-a925-d61c78de0069', '2026-03-30 19:20:01.055', NULL, NULL, NULL, NULL, 970);
INSERT INTO "public"."Uploads" VALUES (831, 'ตง.ถ.2-0106 ถนนรักษ์จันทน์ ซอย 38.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0106 ถนนรักษ์จันทน์ ซอย 38.jpg', 'image', NULL, 'ce0ff212-b2b3-4bef-a421-011e93e597f7', '2026-03-30 19:20:01.056', NULL, NULL, NULL, NULL, 970);
INSERT INTO "public"."Uploads" VALUES (832, 'ตง.ถ.2-0106 ถนนรักษ์จันทน์ ซอย 39.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0106 ถนนรักษ์จันทน์ ซอย 39.jpg', 'image', NULL, '158aaa71-0906-40a2-ad45-f613ef8ba5e6', '2026-03-30 19:20:01.057', NULL, NULL, NULL, NULL, 970);
INSERT INTO "public"."Uploads" VALUES (833, 'ตง.ถ.2-0107 ถนนรักษ์จันทน์ ซอย 51.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0107 ถนนรักษ์จันทน์ ซอย 51.jpg', 'image', NULL, 'f3a9f24c-b86a-476d-82d8-fa788c087f49', '2026-03-30 19:20:01.057', NULL, NULL, NULL, NULL, 971);
INSERT INTO "public"."Uploads" VALUES (834, 'ตง.ถ.2-0107 ถนนรักษ์จันทน์ ซอย 52.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0107 ถนนรักษ์จันทน์ ซอย 52.jpg', 'image', NULL, 'ede11632-31b2-420c-a5c3-b1f906d9f6a6', '2026-03-30 19:20:01.058', NULL, NULL, NULL, NULL, 971);
INSERT INTO "public"."Uploads" VALUES (835, 'ตง.ถ.2-0107 ถนนรักษ์จันทน์ ซอย 53.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0107 ถนนรักษ์จันทน์ ซอย 53.jpg', 'image', NULL, '0e7be293-4b4e-4c75-bf01-a036bbe22984', '2026-03-30 19:20:01.058', NULL, NULL, NULL, NULL, 971);
INSERT INTO "public"."Uploads" VALUES (836, 'ตง.ถ.2-0107 ถนนรักษ์จันทน์ ซอย 54.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0107 ถนนรักษ์จันทน์ ซอย 54.jpg', 'image', NULL, 'b67bf3c0-bddc-4eeb-8c9f-74fba452bb21', '2026-03-30 19:20:01.059', NULL, NULL, NULL, NULL, 971);
INSERT INTO "public"."Uploads" VALUES (837, 'ตง.ถ.2-0107 ถนนรักษ์จันทน์ ซอย 55.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0107 ถนนรักษ์จันทน์ ซอย 55.jpg', 'image', NULL, '0b84dc10-bbcd-4aa1-9235-dd2f331399b3', '2026-03-30 19:20:01.06', NULL, NULL, NULL, NULL, 971);
INSERT INTO "public"."Uploads" VALUES (838, 'ตง.ถ.2-0107 ถนนรักษ์จันทน์ ซอย 56.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0107 ถนนรักษ์จันทน์ ซอย 56.jpg', 'image', NULL, 'ee7d4dad-0e00-4d5e-8fc3-962afd5050e5', '2026-03-30 19:20:01.06', NULL, NULL, NULL, NULL, 971);
INSERT INTO "public"."Uploads" VALUES (839, 'ตง.ถ.2-0107 ถนนรักษ์จันทน์ ซอย 57.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0107 ถนนรักษ์จันทน์ ซอย 57.jpg', 'image', NULL, 'c4a5f3ce-21a8-42be-9811-39d8187a5729', '2026-03-30 19:20:01.061', NULL, NULL, NULL, NULL, 971);
INSERT INTO "public"."Uploads" VALUES (840, 'ตง.ถ.2-0107 ถนนรักษ์จันทน์ ซอย 58.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0107 ถนนรักษ์จันทน์ ซอย 58.jpg', 'image', NULL, '6725bd29-6a6a-46d2-a9fe-27cc5012ced6', '2026-03-30 19:20:01.061', NULL, NULL, NULL, NULL, 971);
INSERT INTO "public"."Uploads" VALUES (841, 'ตง.ถ.2-0107 ถนนรักษ์จันทน์ ซอย 59.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0107 ถนนรักษ์จันทน์ ซอย 59.jpg', 'image', NULL, 'a40db24b-af5a-4d99-9dac-2e16f2423391', '2026-03-30 19:20:01.062', NULL, NULL, NULL, NULL, 971);
INSERT INTO "public"."Uploads" VALUES (842, 'ตง.ถ.2-0108 ถนนรักษ์จันทน์ ซอย 7 (ซอยผสมเทียม)1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0108 ถนนรักษ์จันทน์ ซอย 7 (ซอยผสมเทียม)1.jpg', 'image', NULL, '4ab3a874-69a5-4417-b12a-79ca112f16b7', '2026-03-30 19:20:01.063', NULL, NULL, NULL, NULL, 972);
INSERT INTO "public"."Uploads" VALUES (843, 'ตง.ถ.2-0108 ถนนรักษ์จันทน์ ซอย 7 (ซอยผสมเทียม)2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0108 ถนนรักษ์จันทน์ ซอย 7 (ซอยผสมเทียม)2.jpg', 'image', NULL, '1135bee4-bcb2-4e62-8110-db9d389200ec', '2026-03-30 19:20:01.064', NULL, NULL, NULL, NULL, 972);
INSERT INTO "public"."Uploads" VALUES (844, 'ตง.ถ.2-0108 ถนนรักษ์จันทน์ ซอย 7 (ซอยผสมเทียม)3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0108 ถนนรักษ์จันทน์ ซอย 7 (ซอยผสมเทียม)3.jpg', 'image', NULL, 'c31ef2f6-90dd-4877-b638-2a740b70a125', '2026-03-30 19:20:01.065', NULL, NULL, NULL, NULL, 972);
INSERT INTO "public"."Uploads" VALUES (845, 'ตง.ถ.2-0108 ถนนรักษ์จันทน์ ซอย 7 (ซอยผสมเทียม)4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0108 ถนนรักษ์จันทน์ ซอย 7 (ซอยผสมเทียม)4.jpg', 'image', NULL, '60c6f321-563d-4727-bffb-f7c4ec42d2ef', '2026-03-30 19:20:01.065', NULL, NULL, NULL, NULL, 972);
INSERT INTO "public"."Uploads" VALUES (846, 'ตง.ถ.2-0108 ถนนรักษ์จันทน์ ซอย 7 (ซอยผสมเทียม)5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0108 ถนนรักษ์จันทน์ ซอย 7 (ซอยผสมเทียม)5.jpg', 'image', NULL, 'c45572a9-7f01-4432-b6fb-70ac913161a9', '2026-03-30 19:20:01.066', NULL, NULL, NULL, NULL, 972);
INSERT INTO "public"."Uploads" VALUES (847, 'ตง.ถ.2-0108 ถนนรักษ์จันทน์ ซอย 7 (ซอยผสมเทียม)6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0108 ถนนรักษ์จันทน์ ซอย 7 (ซอยผสมเทียม)6.jpg', 'image', NULL, '0eea42e1-90b2-4e61-80c0-8bd8d1573498', '2026-03-30 19:20:01.066', NULL, NULL, NULL, NULL, 972);
INSERT INTO "public"."Uploads" VALUES (848, 'ตง.ถ.2-0108 ถนนรักษ์จันทน์ ซอย 7 (ซอยผสมเทียม)7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0108 ถนนรักษ์จันทน์ ซอย 7 (ซอยผสมเทียม)7.jpg', 'image', NULL, '53ca01c1-6228-4ee0-926c-8292e8e0ba50', '2026-03-30 19:20:01.067', NULL, NULL, NULL, NULL, 972);
INSERT INTO "public"."Uploads" VALUES (849, 'ตง.ถ.2-0108 ถนนรักษ์จันทน์ ซอย 7 (ซอยผสมเทียม)8.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0108 ถนนรักษ์จันทน์ ซอย 7 (ซอยผสมเทียม)8.jpg', 'image', NULL, 'c418fc78-e856-4394-8c9b-20021b18068e', '2026-03-30 19:20:01.068', NULL, NULL, NULL, NULL, 972);
INSERT INTO "public"."Uploads" VALUES (850, 'ตง.ถ.2-0108 ถนนรักษ์จันทน์ ซอย 7 (ซอยผสมเทียม)9.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0108 ถนนรักษ์จันทน์ ซอย 7 (ซอยผสมเทียม)9.jpg', 'image', NULL, '11616081-20be-4903-9143-9f7d1f960e7c', '2026-03-30 19:20:01.068', NULL, NULL, NULL, NULL, 972);
INSERT INTO "public"."Uploads" VALUES (860, 'ตง.ถ.2-0110 ถนนอุดมลาภ ซอย 31.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0110 ถนนอุดมลาภ ซอย 31.jpg', 'image', NULL, 'c1a538c7-60e3-43bc-b025-cae30610d584', '2026-03-30 19:20:01.074', NULL, NULL, NULL, NULL, 973);
INSERT INTO "public"."Uploads" VALUES (861, 'ตง.ถ.2-0110 ถนนอุดมลาภ ซอย 32.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0110 ถนนอุดมลาภ ซอย 32.jpg', 'image', NULL, '525a9bc4-e672-4bba-bce6-25dfa9c9afae', '2026-03-30 19:20:01.075', NULL, NULL, NULL, NULL, 973);
INSERT INTO "public"."Uploads" VALUES (862, 'ตง.ถ.2-0110 ถนนอุดมลาภ ซอย 33.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0110 ถนนอุดมลาภ ซอย 33.jpg', 'image', NULL, '1ea9b0aa-f7ab-4a60-a751-9a215895b85e', '2026-03-30 19:20:01.076', NULL, NULL, NULL, NULL, 973);
INSERT INTO "public"."Uploads" VALUES (863, 'ตง.ถ.2-0110 ถนนอุดมลาภ ซอย 34.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0110 ถนนอุดมลาภ ซอย 34.jpg', 'image', NULL, 'ca3a6e96-7b90-4d6f-b037-7da377cd231b', '2026-03-30 19:20:01.077', NULL, NULL, NULL, NULL, 973);
INSERT INTO "public"."Uploads" VALUES (864, 'ตง.ถ.2-0110 ถนนอุดมลาภ ซอย 35.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0110 ถนนอุดมลาภ ซอย 35.jpg', 'image', NULL, 'd0d4614f-676f-421f-b751-94d84a225717', '2026-03-30 19:20:01.078', NULL, NULL, NULL, NULL, 973);
INSERT INTO "public"."Uploads" VALUES (865, 'ตง.ถ.2-0110 ถนนอุดมลาภ ซอย 36.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0110 ถนนอุดมลาภ ซอย 36.jpg', 'image', NULL, '3d5414a1-c19c-42da-bc7d-7b9c895f747e', '2026-03-30 19:20:01.078', NULL, NULL, NULL, NULL, 973);
INSERT INTO "public"."Uploads" VALUES (866, 'ตง.ถ.2-0110 ถนนอุดมลาภ ซอย 37.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0110 ถนนอุดมลาภ ซอย 37.jpg', 'image', NULL, '3bf0a14a-73f9-42ae-9350-7249529f2dce', '2026-03-30 19:20:01.079', NULL, NULL, NULL, NULL, 973);
INSERT INTO "public"."Uploads" VALUES (867, 'ตง.ถ.2-0110 ถนนอุดมลาภ ซอย 38.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0110 ถนนอุดมลาภ ซอย 38.jpg', 'image', NULL, 'ec8d2a97-4d33-4622-ac04-77d573f222ca', '2026-03-30 19:20:01.079', NULL, NULL, NULL, NULL, 973);
INSERT INTO "public"."Uploads" VALUES (868, 'ตง.ถ.2-0110 ถนนอุดมลาภ ซอย 39.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0110 ถนนอุดมลาภ ซอย 39.jpg', 'image', NULL, '0db6d9d3-50cd-4f04-a68f-375d05c7b8a9', '2026-03-30 19:20:01.08', NULL, NULL, NULL, NULL, 973);
INSERT INTO "public"."Uploads" VALUES (869, 'ตง.ถ.2-0111 ถนนอุดมลาภ ซอย 51.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0111 ถนนอุดมลาภ ซอย 51.jpg', 'image', NULL, '56f76b55-7730-49a1-a8a3-c57b237facca', '2026-03-30 19:20:01.08', NULL, NULL, NULL, NULL, 974);
INSERT INTO "public"."Uploads" VALUES (870, 'ตง.ถ.2-0111 ถนนอุดมลาภ ซอย 52.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0111 ถนนอุดมลาภ ซอย 52.jpg', 'image', NULL, 'f79e6883-bc7d-4b7e-b72d-13deb9d5d663', '2026-03-30 19:20:01.081', NULL, NULL, NULL, NULL, 974);
INSERT INTO "public"."Uploads" VALUES (871, 'ตง.ถ.2-0111 ถนนอุดมลาภ ซอย 53.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0111 ถนนอุดมลาภ ซอย 53.jpg', 'image', NULL, '8d17b9e2-946f-4736-80c8-02cb16bf1af9', '2026-03-30 19:20:01.081', NULL, NULL, NULL, NULL, 974);
INSERT INTO "public"."Uploads" VALUES (872, 'ตง.ถ.2-0111 ถนนอุดมลาภ ซอย 54.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0111 ถนนอุดมลาภ ซอย 54.jpg', 'image', NULL, '4a2526be-e846-4fca-9019-506e8b1390cb', '2026-03-30 19:20:01.082', NULL, NULL, NULL, NULL, 974);
INSERT INTO "public"."Uploads" VALUES (873, 'ตง.ถ.2-0111 ถนนอุดมลาภ ซอย 55.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0111 ถนนอุดมลาภ ซอย 55.jpg', 'image', NULL, 'a6c7e7b8-2c76-4818-9717-449b5fe4f834', '2026-03-30 19:20:01.083', NULL, NULL, NULL, NULL, 974);
INSERT INTO "public"."Uploads" VALUES (874, 'ตง.ถ.2-0111 ถนนอุดมลาภ ซอย 56.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0111 ถนนอุดมลาภ ซอย 56.jpg', 'image', NULL, 'fc84818b-9cd2-4bfd-91a4-a861934633bf', '2026-03-30 19:20:01.083', NULL, NULL, NULL, NULL, 974);
INSERT INTO "public"."Uploads" VALUES (875, 'ตง.ถ.2-0111 ถนนอุดมลาภ ซอย 57.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0111 ถนนอุดมลาภ ซอย 57.jpg', 'image', NULL, 'e44d263a-56ce-49b9-a327-d6bb558d75d7', '2026-03-30 19:20:01.084', NULL, NULL, NULL, NULL, 974);
INSERT INTO "public"."Uploads" VALUES (876, 'ตง.ถ.2-0111 ถนนอุดมลาภ ซอย 58.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0111 ถนนอุดมลาภ ซอย 58.jpg', 'image', NULL, 'fe86368e-f1de-4bac-bc52-1e0ac5a29775', '2026-03-30 19:20:01.085', NULL, NULL, NULL, NULL, 974);
INSERT INTO "public"."Uploads" VALUES (877, 'ตง.ถ.2-0111 ถนนอุดมลาภ ซอย 59.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0111 ถนนอุดมลาภ ซอย 59.jpg', 'image', NULL, '855dc72d-f0da-415a-a9d1-46068774c136', '2026-03-30 19:20:01.085', NULL, NULL, NULL, NULL, 974);
INSERT INTO "public"."Uploads" VALUES (878, 'ตง.ถ.2-0112 ถนนอุดมลาภ ซอย 71.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0112 ถนนอุดมลาภ ซอย 71.jpg', 'image', NULL, '9ddf6663-43b0-49dd-bbf0-335e83922320', '2026-03-30 19:20:01.086', NULL, NULL, NULL, NULL, 975);
INSERT INTO "public"."Uploads" VALUES (879, 'ตง.ถ.2-0112 ถนนอุดมลาภ ซอย 72.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0112 ถนนอุดมลาภ ซอย 72.jpg', 'image', NULL, '68f3a554-70c4-4559-adc9-4cbe68302f30', '2026-03-30 19:20:01.087', NULL, NULL, NULL, NULL, 975);
INSERT INTO "public"."Uploads" VALUES (880, 'ตง.ถ.2-0112 ถนนอุดมลาภ ซอย 73.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0112 ถนนอุดมลาภ ซอย 73.jpg', 'image', NULL, 'b3b9c7ff-7d38-40bd-a6fc-02a65008d5d8', '2026-03-30 19:20:01.087', NULL, NULL, NULL, NULL, 975);
INSERT INTO "public"."Uploads" VALUES (881, 'ตง.ถ.2-0112 ถนนอุดมลาภ ซอย 74.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0112 ถนนอุดมลาภ ซอย 74.jpg', 'image', NULL, 'c219d5e1-b4e0-4520-bd68-b6bcbfac2d4d', '2026-03-30 19:20:01.087', NULL, NULL, NULL, NULL, 975);
INSERT INTO "public"."Uploads" VALUES (882, 'ตง.ถ.2-0112 ถนนอุดมลาภ ซอย 75.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0112 ถนนอุดมลาภ ซอย 75.jpg', 'image', NULL, 'd302df2b-34df-40e6-b31a-2509e154b24a', '2026-03-30 19:20:01.088', NULL, NULL, NULL, NULL, 975);
INSERT INTO "public"."Uploads" VALUES (883, 'ตง.ถ.2-0112 ถนนอุดมลาภ ซอย 76.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0112 ถนนอุดมลาภ ซอย 76.jpg', 'image', NULL, '840aad90-e157-4bea-94f8-116a0ed164ce', '2026-03-30 19:20:01.088', NULL, NULL, NULL, NULL, 975);
INSERT INTO "public"."Uploads" VALUES (884, 'ตง.ถ.2-0112 ถนนอุดมลาภ ซอย 77.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0112 ถนนอุดมลาภ ซอย 77.jpg', 'image', NULL, 'fda8f90b-0dfe-4cd8-9d1b-52453c7de59c', '2026-03-30 19:20:01.089', NULL, NULL, NULL, NULL, 975);
INSERT INTO "public"."Uploads" VALUES (885, 'ตง.ถ.2-0112 ถนนอุดมลาภ ซอย 78.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0112 ถนนอุดมลาภ ซอย 78.jpg', 'image', NULL, 'dddf75ca-a13d-4fca-9ec6-0dae862420a8', '2026-03-30 19:20:01.09', NULL, NULL, NULL, NULL, 975);
INSERT INTO "public"."Uploads" VALUES (886, 'ตง.ถ.2-0112 ถนนอุดมลาภ ซอย 79.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0112 ถนนอุดมลาภ ซอย 79.jpg', 'image', NULL, '792d1ddc-e3c9-4d0d-9236-43715d34529f', '2026-03-30 19:20:01.091', NULL, NULL, NULL, NULL, 975);
INSERT INTO "public"."Uploads" VALUES (887, 'ตง.ถ.2-0113 ถนนอุดมลาภ ซอย 91.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0113 ถนนอุดมลาภ ซอย 91.jpg', 'image', NULL, 'dc6f8d0f-458d-48d9-af55-e2d9e026ebef', '2026-03-30 19:20:01.091', NULL, NULL, NULL, NULL, 976);
INSERT INTO "public"."Uploads" VALUES (239, 'ตง.ถ.2-0027 ถนนสายทุ่งควน (ตอนที่1)1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0027 ถนนสายทุ่งควน (ตอนที่1)1.jpg', 'image', NULL, 'e508c427-abff-47ef-993c-bac2d48dcd9f', '2026-03-30 19:20:00.673', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (240, 'ตง.ถ.2-0027 ถนนสายทุ่งควน (ตอนที่1)2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0027 ถนนสายทุ่งควน (ตอนที่1)2.jpg', 'image', NULL, '5169b278-9d81-449f-967c-6d0e3fc29211', '2026-03-30 19:20:00.673', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (241, 'ตง.ถ.2-0027 ถนนสายทุ่งควน (ตอนที่1)3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0027 ถนนสายทุ่งควน (ตอนที่1)3.jpg', 'image', NULL, 'b2b9d391-f956-4ef6-94d5-38efcd4f2f37', '2026-03-30 19:20:00.674', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (242, 'ตง.ถ.2-0027 ถนนสายทุ่งควน (ตอนที่1)4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0027 ถนนสายทุ่งควน (ตอนที่1)4.jpg', 'image', NULL, 'b14a75a6-6ddf-4ee1-8870-c06238448e8a', '2026-03-30 19:20:00.674', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (243, 'ตง.ถ.2-0027 ถนนสายทุ่งควน (ตอนที่1)5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0027 ถนนสายทุ่งควน (ตอนที่1)5.jpg', 'image', NULL, 'e6fb8c7e-47e4-49da-8fd2-78794207b382', '2026-03-30 19:20:00.675', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (244, 'ตง.ถ.2-0027 ถนนสายทุ่งควน (ตอนที่1)6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0027 ถนนสายทุ่งควน (ตอนที่1)6.jpg', 'image', NULL, 'a67a0607-4c37-43f9-9f1c-21dcf9059021', '2026-03-30 19:20:00.676', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (245, 'ตง.ถ.2-0028 ถนนสายทุ่งควน (ตอนที่2)1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0028 ถนนสายทุ่งควน (ตอนที่2)1.jpg', 'image', NULL, '07f8913d-6967-4e72-87a7-226e5617594d', '2026-03-30 19:20:00.677', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (246, 'ตง.ถ.2-0028 ถนนสายทุ่งควน (ตอนที่2)2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0028 ถนนสายทุ่งควน (ตอนที่2)2.jpg', 'image', NULL, '9f1b45c2-2052-4690-8b48-290f231338a3', '2026-03-30 19:20:00.678', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (247, 'ตง.ถ.2-0028 ถนนสายทุ่งควน (ตอนที่2)3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0028 ถนนสายทุ่งควน (ตอนที่2)3.jpg', 'image', NULL, '1d7105ed-513c-43f1-890d-4231c339f009', '2026-03-30 19:20:00.679', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (248, 'ตง.ถ.2-0028 ถนนสายทุ่งควน (ตอนที่2)4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0028 ถนนสายทุ่งควน (ตอนที่2)4.jpg', 'image', NULL, '9373b063-46e7-49fa-8546-d094d9a77b8c', '2026-03-30 19:20:00.68', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (359, 'ตง.ถ.2-0045 ถนนกันตังซอย 86.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0045 ถนนกันตังซอย 86.jpg', 'image', NULL, '0859841c-01c4-44ae-9315-2f1d763646ab', '2026-03-30 19:20:00.75', NULL, NULL, NULL, NULL, 909);
INSERT INTO "public"."Uploads" VALUES (888, 'ตง.ถ.2-0113 ถนนอุดมลาภ ซอย 92.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0113 ถนนอุดมลาภ ซอย 92.jpg', 'image', NULL, '424cb333-f1ce-4380-a356-9bf2384ab58d', '2026-03-30 19:20:01.092', NULL, NULL, NULL, NULL, 976);
INSERT INTO "public"."Uploads" VALUES (249, 'ตง.ถ.2-0028 ถนนสายทุ่งควน (ตอนที่2)5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0028 ถนนสายทุ่งควน (ตอนที่2)5.jpg', 'image', NULL, '776b2e24-adc7-4b2e-9cb8-e7a4c6e17a8e', '2026-03-30 19:20:00.68', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (250, 'ตง.ถ.2-0028 ถนนสายทุ่งควน (ตอนที่2)6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0028 ถนนสายทุ่งควน (ตอนที่2)6.jpg', 'image', NULL, 'e24bb638-3fa9-4694-af86-e215d57ffca4', '2026-03-30 19:20:00.681', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (889, 'ตง.ถ.2-0113 ถนนอุดมลาภ ซอย 93.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0113 ถนนอุดมลาภ ซอย 93.jpg', 'image', NULL, 'aef69afc-8473-4422-b129-c9800bfd1783', '2026-03-30 19:20:01.093', NULL, NULL, NULL, NULL, 976);
INSERT INTO "public"."Uploads" VALUES (890, 'ตง.ถ.2-0113 ถนนอุดมลาภ ซอย 94.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0113 ถนนอุดมลาภ ซอย 94.jpg', 'image', NULL, '008790f8-6be4-4d91-bf0e-272da2794192', '2026-03-30 19:20:01.093', NULL, NULL, NULL, NULL, 976);
INSERT INTO "public"."Uploads" VALUES (891, 'ตง.ถ.2-0113 ถนนอุดมลาภ ซอย 95.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0113 ถนนอุดมลาภ ซอย 95.jpg', 'image', NULL, '40516667-a311-4a02-9794-a994de206c4d', '2026-03-30 19:20:01.094', NULL, NULL, NULL, NULL, 976);
INSERT INTO "public"."Uploads" VALUES (892, 'ตง.ถ.2-0113 ถนนอุดมลาภ ซอย 96.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0113 ถนนอุดมลาภ ซอย 96.jpg', 'image', NULL, '70c6d21b-2821-4c92-9dbd-ac2f0d62253d', '2026-03-30 19:20:01.094', NULL, NULL, NULL, NULL, 976);
INSERT INTO "public"."Uploads" VALUES (893, 'ตง.ถ.2-0113 ถนนอุดมลาภ ซอย 97.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0113 ถนนอุดมลาภ ซอย 97.jpg', 'image', NULL, 'dc510c4b-8bfa-47a8-951e-a219f4c74645', '2026-03-30 19:20:01.095', NULL, NULL, NULL, NULL, 976);
INSERT INTO "public"."Uploads" VALUES (894, 'ตง.ถ.2-0113 ถนนอุดมลาภ ซอย 98.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0113 ถนนอุดมลาภ ซอย 98.jpg', 'image', NULL, '238c7f3b-a4da-49de-b144-75836fe8bd58', '2026-03-30 19:20:01.095', NULL, NULL, NULL, NULL, 976);
INSERT INTO "public"."Uploads" VALUES (895, 'ตง.ถ.2-0113 ถนนอุดมลาภ ซอย 99.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0113 ถนนอุดมลาภ ซอย 99.jpg', 'image', NULL, 'cfc6367c-a6ab-42e1-940d-43cf13ca85ec', '2026-03-30 19:20:01.096', NULL, NULL, NULL, NULL, 976);
INSERT INTO "public"."Uploads" VALUES (896, 'ตง.ถ.2-0114 ถนนควนคีรี ซอย11.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0114 ถนนควนคีรี ซอย11.jpg', 'image', NULL, '7894efa4-dd99-4871-80c6-d1edbf9f52b4', '2026-03-30 19:20:01.098', NULL, NULL, NULL, NULL, 977);
INSERT INTO "public"."Uploads" VALUES (897, 'ตง.ถ.2-0114 ถนนควนคีรี ซอย12.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0114 ถนนควนคีรี ซอย12.jpg', 'image', NULL, 'ca929c9c-4d5f-451d-ad35-dd8b8997b3fa', '2026-03-30 19:20:01.099', NULL, NULL, NULL, NULL, 977);
INSERT INTO "public"."Uploads" VALUES (898, 'ตง.ถ.2-0114 ถนนควนคีรี ซอย13.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0114 ถนนควนคีรี ซอย13.jpg', 'image', NULL, '6d22e3c8-f922-47b2-b406-ae6e85d11840', '2026-03-30 19:20:01.1', NULL, NULL, NULL, NULL, 977);
INSERT INTO "public"."Uploads" VALUES (899, 'ตง.ถ.2-0114 ถนนควนคีรี ซอย14.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0114 ถนนควนคีรี ซอย14.jpg', 'image', NULL, '9c33eeea-cc40-4b0e-8f5b-4fd7242159cd', '2026-03-30 19:20:01.101', NULL, NULL, NULL, NULL, 977);
INSERT INTO "public"."Uploads" VALUES (900, 'ตง.ถ.2-0114 ถนนควนคีรี ซอย15.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0114 ถนนควนคีรี ซอย15.jpg', 'image', NULL, '7e9dc2ee-97ff-40b8-81e4-bfde7218a309', '2026-03-30 19:20:01.101', NULL, NULL, NULL, NULL, 977);
INSERT INTO "public"."Uploads" VALUES (901, 'ตง.ถ.2-0114 ถนนควนคีรี ซอย16.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0114 ถนนควนคีรี ซอย16.jpg', 'image', NULL, 'a5e7a15f-901b-4004-b0cc-516fce4ddbf3', '2026-03-30 19:20:01.102', NULL, NULL, NULL, NULL, 977);
INSERT INTO "public"."Uploads" VALUES (902, 'ตง.ถ.2-0114 ถนนควนคีรี ซอย17.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0114 ถนนควนคีรี ซอย17.jpg', 'image', NULL, 'ff337642-8d55-4756-b9be-d2bce4611278', '2026-03-30 19:20:01.102', NULL, NULL, NULL, NULL, 977);
INSERT INTO "public"."Uploads" VALUES (903, 'ตง.ถ.2-0114 ถนนควนคีรี ซอย18.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0114 ถนนควนคีรี ซอย18.jpg', 'image', NULL, '2003a45e-bb74-4583-be55-587858e26fd6', '2026-03-30 19:20:01.103', NULL, NULL, NULL, NULL, 977);
INSERT INTO "public"."Uploads" VALUES (904, 'ตง.ถ.2-0114 ถนนควนคีรี ซอย19.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0114 ถนนควนคีรี ซอย19.jpg', 'image', NULL, '0768dc4d-455b-47cd-afc4-d8f11223502f', '2026-03-30 19:20:01.104', NULL, NULL, NULL, NULL, 977);
INSERT INTO "public"."Uploads" VALUES (905, 'ตง.ถ.2-0115 ถนนควนคีรี ซอย31.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0115 ถนนควนคีรี ซอย31.jpg', 'image', NULL, '970982de-fd56-4aef-99c4-d85da2855900', '2026-03-30 19:20:01.105', NULL, NULL, NULL, NULL, 978);
INSERT INTO "public"."Uploads" VALUES (906, 'ตง.ถ.2-0115 ถนนควนคีรี ซอย32.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0115 ถนนควนคีรี ซอย32.jpg', 'image', NULL, 'b19be647-5b1a-41e1-a311-b3f4bedee5cb', '2026-03-30 19:20:01.105', NULL, NULL, NULL, NULL, 978);
INSERT INTO "public"."Uploads" VALUES (907, 'ตง.ถ.2-0115 ถนนควนคีรี ซอย33.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0115 ถนนควนคีรี ซอย33.jpg', 'image', NULL, '0310b2f5-6122-4001-9911-536231feffd0', '2026-03-30 19:20:01.106', NULL, NULL, NULL, NULL, 978);
INSERT INTO "public"."Uploads" VALUES (908, 'ตง.ถ.2-0115 ถนนควนคีรี ซอย34.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0115 ถนนควนคีรี ซอย34.jpg', 'image', NULL, 'b59406cb-fdcc-4f98-8563-bbca5419bc6b', '2026-03-30 19:20:01.107', NULL, NULL, NULL, NULL, 978);
INSERT INTO "public"."Uploads" VALUES (909, 'ตง.ถ.2-0115 ถนนควนคีรี ซอย35.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0115 ถนนควนคีรี ซอย35.jpg', 'image', NULL, '5880390c-db80-4f6d-85ea-04ab7e8f243f', '2026-03-30 19:20:01.107', NULL, NULL, NULL, NULL, 978);
INSERT INTO "public"."Uploads" VALUES (910, 'ตง.ถ.2-0115 ถนนควนคีรี ซอย36.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0115 ถนนควนคีรี ซอย36.jpg', 'image', NULL, '96fed893-17df-4712-97e3-f20226196c96', '2026-03-30 19:20:01.108', NULL, NULL, NULL, NULL, 978);
INSERT INTO "public"."Uploads" VALUES (911, 'ตง.ถ.2-0115 ถนนควนคีรี ซอย37.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0115 ถนนควนคีรี ซอย37.jpg', 'image', NULL, '218cb45d-a30c-43ac-9f33-0dc6229b4f6c', '2026-03-30 19:20:01.109', NULL, NULL, NULL, NULL, 978);
INSERT INTO "public"."Uploads" VALUES (912, 'ตง.ถ.2-0115 ถนนควนคีรี ซอย38.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0115 ถนนควนคีรี ซอย38.jpg', 'image', NULL, 'cab53696-80b8-4be4-a6c1-a4c237afe1f8', '2026-03-30 19:20:01.109', NULL, NULL, NULL, NULL, 978);
INSERT INTO "public"."Uploads" VALUES (913, 'ตง.ถ.2-0115 ถนนควนคีรี ซอย39.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0115 ถนนควนคีรี ซอย39.jpg', 'image', NULL, '733852fb-d5ab-42ea-8d96-ac3d21480849', '2026-03-30 19:20:01.11', NULL, NULL, NULL, NULL, 978);
INSERT INTO "public"."Uploads" VALUES (914, 'ตง.ถ.2-0116 ถนนควนคีรี ซอย51.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0116 ถนนควนคีรี ซอย51.jpg', 'image', NULL, '19399213-504b-4f1e-8044-01eef22a463d', '2026-03-30 19:20:01.11', NULL, NULL, NULL, NULL, 979);
INSERT INTO "public"."Uploads" VALUES (915, 'ตง.ถ.2-0116 ถนนควนคีรี ซอย52.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0116 ถนนควนคีรี ซอย52.jpg', 'image', NULL, '70287465-0872-42ba-bc36-05f21c42eb6b', '2026-03-30 19:20:01.111', NULL, NULL, NULL, NULL, 979);
INSERT INTO "public"."Uploads" VALUES (916, 'ตง.ถ.2-0116 ถนนควนคีรี ซอย53.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0116 ถนนควนคีรี ซอย53.jpg', 'image', NULL, '550e8197-ad58-4bd6-99d8-fe5deebdacf4', '2026-03-30 19:20:01.112', NULL, NULL, NULL, NULL, 979);
INSERT INTO "public"."Uploads" VALUES (360, 'ตง.ถ.2-0045 ถนนกันตังซอย 87.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0045 ถนนกันตังซอย 87.jpg', 'image', NULL, '4fa831bf-cc70-455f-8921-9d4a1ecd79e1', '2026-03-30 19:20:00.751', NULL, NULL, NULL, NULL, 909);
INSERT INTO "public"."Uploads" VALUES (917, 'ตง.ถ.2-0116 ถนนควนคีรี ซอย54.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0116 ถนนควนคีรี ซอย54.jpg', 'image', NULL, '22c8f7a6-277d-41db-8b36-b23c41adfb19', '2026-03-30 19:20:01.113', NULL, NULL, NULL, NULL, 979);
INSERT INTO "public"."Uploads" VALUES (918, 'ตง.ถ.2-0116 ถนนควนคีรี ซอย55.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0116 ถนนควนคีรี ซอย55.jpg', 'image', NULL, '1094130b-1d04-4632-9639-3b08ab5a16c6', '2026-03-30 19:20:01.113', NULL, NULL, NULL, NULL, 979);
INSERT INTO "public"."Uploads" VALUES (919, 'ตง.ถ.2-0116 ถนนควนคีรี ซอย56.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0116 ถนนควนคีรี ซอย56.jpg', 'image', NULL, 'e0cd3ac0-110e-431b-be93-95253a2fa304', '2026-03-30 19:20:01.114', NULL, NULL, NULL, NULL, 979);
INSERT INTO "public"."Uploads" VALUES (920, 'ตง.ถ.2-0116 ถนนควนคีรี ซอย57.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0116 ถนนควนคีรี ซอย57.jpg', 'image', NULL, 'd3846c20-79ce-45c7-bfb0-f4c0907160a7', '2026-03-30 19:20:01.115', NULL, NULL, NULL, NULL, 979);
INSERT INTO "public"."Uploads" VALUES (921, 'ตง.ถ.2-0116 ถนนควนคีรี ซอย58.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0116 ถนนควนคีรี ซอย58.jpg', 'image', NULL, 'dc6e06df-77e7-4a24-bd29-9c3043f5bef6', '2026-03-30 19:20:01.115', NULL, NULL, NULL, NULL, 979);
INSERT INTO "public"."Uploads" VALUES (922, 'ตง.ถ.2-0116 ถนนควนคีรี ซอย59.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0116 ถนนควนคีรี ซอย59.jpg', 'image', NULL, '4f5ea279-9de4-4811-828a-865882c9fb29', '2026-03-30 19:20:01.115', NULL, NULL, NULL, NULL, 979);
INSERT INTO "public"."Uploads" VALUES (923, 'ตง.ถ.2-0117 ถนนแยกซอยควนคีรี 1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0117 ถนนแยกซอยควนคีรี 1.jpg', 'image', NULL, 'e8d9871a-5a59-4ee3-b229-c46c0c98a9ee', '2026-03-30 19:20:01.116', NULL, NULL, NULL, NULL, 980);
INSERT INTO "public"."Uploads" VALUES (924, 'ตง.ถ.2-0117 ถนนแยกซอยควนคีรี 2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0117 ถนนแยกซอยควนคีรี 2.jpg', 'image', NULL, 'ef91e78f-3eaf-4c88-9f9f-0bb549d98af4', '2026-03-30 19:20:01.116', NULL, NULL, NULL, NULL, 980);
INSERT INTO "public"."Uploads" VALUES (925, 'ตง.ถ.2-0117 ถนนแยกซอยควนคีรี 3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0117 ถนนแยกซอยควนคีรี 3.jpg', 'image', NULL, '99023279-8994-4cf4-ab78-76cad7fe0df6', '2026-03-30 19:20:01.117', NULL, NULL, NULL, NULL, 980);
INSERT INTO "public"."Uploads" VALUES (926, 'ตง.ถ.2-0117 ถนนแยกซอยควนคีรี 4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0117 ถนนแยกซอยควนคีรี 4.jpg', 'image', NULL, '0e85146a-bbc3-4230-bd50-945a20fd0333', '2026-03-30 19:20:01.118', NULL, NULL, NULL, NULL, 980);
INSERT INTO "public"."Uploads" VALUES (927, 'ตง.ถ.2-0117 ถนนแยกซอยควนคีรี 5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0117 ถนนแยกซอยควนคีรี 5.jpg', 'image', NULL, '96d19939-c9fd-4093-a932-298d34c53525', '2026-03-30 19:20:01.119', NULL, NULL, NULL, NULL, 980);
INSERT INTO "public"."Uploads" VALUES (928, 'ตง.ถ.2-0117 ถนนแยกซอยควนคีรี 6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0117 ถนนแยกซอยควนคีรี 6.jpg', 'image', NULL, '1fabe737-3d92-46f4-939a-ce12efe60015', '2026-03-30 19:20:01.119', NULL, NULL, NULL, NULL, 980);
INSERT INTO "public"."Uploads" VALUES (929, 'ตง.ถ.2-0117 ถนนแยกซอยควนคีรี 7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0117 ถนนแยกซอยควนคีรี 7.jpg', 'image', NULL, 'e24bf7d0-e794-4f02-aa4f-d7e91eb42da4', '2026-03-30 19:20:01.12', NULL, NULL, NULL, NULL, 980);
INSERT INTO "public"."Uploads" VALUES (930, 'ตง.ถ.2-0117 ถนนแยกซอยควนคีรี 8.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0117 ถนนแยกซอยควนคีรี 8.jpg', 'image', NULL, '49503aaa-9422-4e70-ac09-89fbadfe2ba4', '2026-03-30 19:20:01.121', NULL, NULL, NULL, NULL, 980);
INSERT INTO "public"."Uploads" VALUES (931, 'ตง.ถ.2-0117 ถนนแยกซอยควนคีรี 9.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0117 ถนนแยกซอยควนคีรี 9.jpg', 'image', NULL, '19be190f-4a6a-43cc-a016-d53ef57bfeef', '2026-03-30 19:20:01.121', NULL, NULL, NULL, NULL, 980);
INSERT INTO "public"."Uploads" VALUES (932, 'ตง.ถ.2-0118 ถนนเพลินพิทักษ์ ซอย 11.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0118 ถนนเพลินพิทักษ์ ซอย 11.jpg', 'image', NULL, 'd14ffda1-985c-4e56-af79-9390a5483988', '2026-03-30 19:20:01.121', NULL, NULL, NULL, NULL, 981);
INSERT INTO "public"."Uploads" VALUES (933, 'ตง.ถ.2-0118 ถนนเพลินพิทักษ์ ซอย 12.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0118 ถนนเพลินพิทักษ์ ซอย 12.jpg', 'image', NULL, 'aaaf253e-8dfe-4414-ac90-ff210215b7bf', '2026-03-30 19:20:01.122', NULL, NULL, NULL, NULL, 981);
INSERT INTO "public"."Uploads" VALUES (934, 'ตง.ถ.2-0118 ถนนเพลินพิทักษ์ ซอย 13.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0118 ถนนเพลินพิทักษ์ ซอย 13.jpg', 'image', NULL, 'e25891a1-4bf5-42af-9d63-25729facdb7c', '2026-03-30 19:20:01.122', NULL, NULL, NULL, NULL, 981);
INSERT INTO "public"."Uploads" VALUES (935, 'ตง.ถ.2-0118 ถนนเพลินพิทักษ์ ซอย 14.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0118 ถนนเพลินพิทักษ์ ซอย 14.jpg', 'image', NULL, '7cebbfef-593d-42d1-90f3-da49e2646a9f', '2026-03-30 19:20:01.123', NULL, NULL, NULL, NULL, 981);
INSERT INTO "public"."Uploads" VALUES (936, 'ตง.ถ.2-0118 ถนนเพลินพิทักษ์ ซอย 15.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0118 ถนนเพลินพิทักษ์ ซอย 15.jpg', 'image', NULL, '2a03fdea-4a17-4cfb-8e61-93b3bd26884a', '2026-03-30 19:20:01.124', NULL, NULL, NULL, NULL, 981);
INSERT INTO "public"."Uploads" VALUES (937, 'ตง.ถ.2-0118 ถนนเพลินพิทักษ์ ซอย 16.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0118 ถนนเพลินพิทักษ์ ซอย 16.jpg', 'image', NULL, '9457595a-2373-44d9-a13a-4cd33c486f6f', '2026-03-30 19:20:01.124', NULL, NULL, NULL, NULL, 981);
INSERT INTO "public"."Uploads" VALUES (938, 'ตง.ถ.2-0118 ถนนเพลินพิทักษ์ ซอย 17.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0118 ถนนเพลินพิทักษ์ ซอย 17.jpg', 'image', NULL, '96ccf403-8fe5-4ff9-bba6-0cdb10385d5a', '2026-03-30 19:20:01.125', NULL, NULL, NULL, NULL, 981);
INSERT INTO "public"."Uploads" VALUES (939, 'ตง.ถ.2-0118 ถนนเพลินพิทักษ์ ซอย 18.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0118 ถนนเพลินพิทักษ์ ซอย 18.jpg', 'image', NULL, '6006c42a-ba3e-49f1-bc75-400fe19977b7', '2026-03-30 19:20:01.126', NULL, NULL, NULL, NULL, 981);
INSERT INTO "public"."Uploads" VALUES (940, 'ตง.ถ.2-0118 ถนนเพลินพิทักษ์ ซอย 19.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0118 ถนนเพลินพิทักษ์ ซอย 19.jpg', 'image', NULL, 'ba790a5c-bb64-4b3b-a0d0-cda582c81a93', '2026-03-30 19:20:01.126', NULL, NULL, NULL, NULL, 981);
INSERT INTO "public"."Uploads" VALUES (941, 'ตง.ถ.2-0119 ถนนเพลินพิทักษ์ ซอย 21.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0119 ถนนเพลินพิทักษ์ ซอย 21.jpg', 'image', NULL, '2f86ba0b-cee9-4a65-aa67-7a116672cd52', '2026-03-30 19:20:01.127', NULL, NULL, NULL, NULL, 982);
INSERT INTO "public"."Uploads" VALUES (942, 'ตง.ถ.2-0119 ถนนเพลินพิทักษ์ ซอย 22.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0119 ถนนเพลินพิทักษ์ ซอย 22.jpg', 'image', NULL, 'b935db03-0b90-4ae7-b0de-bf36a9bd8996', '2026-03-30 19:20:01.127', NULL, NULL, NULL, NULL, 982);
INSERT INTO "public"."Uploads" VALUES (943, 'ตง.ถ.2-0119 ถนนเพลินพิทักษ์ ซอย 23.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0119 ถนนเพลินพิทักษ์ ซอย 23.jpg', 'image', NULL, 'bcbbd180-bb37-4b67-8856-e4928cf7994e', '2026-03-30 19:20:01.128', NULL, NULL, NULL, NULL, 982);
INSERT INTO "public"."Uploads" VALUES (944, 'ตง.ถ.2-0119 ถนนเพลินพิทักษ์ ซอย 24.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0119 ถนนเพลินพิทักษ์ ซอย 24.jpg', 'image', NULL, 'fcd383ad-e00f-4578-9e01-2064a49fc1b8', '2026-03-30 19:20:01.128', NULL, NULL, NULL, NULL, 982);
INSERT INTO "public"."Uploads" VALUES (945, 'ตง.ถ.2-0119 ถนนเพลินพิทักษ์ ซอย 25.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0119 ถนนเพลินพิทักษ์ ซอย 25.jpg', 'image', NULL, 'bebf3fc8-e7db-4773-8b80-4ad7c0c4a15c', '2026-03-30 19:20:01.129', NULL, NULL, NULL, NULL, 982);
INSERT INTO "public"."Uploads" VALUES (946, 'ตง.ถ.2-0119 ถนนเพลินพิทักษ์ ซอย 26.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0119 ถนนเพลินพิทักษ์ ซอย 26.jpg', 'image', NULL, 'b3f18d87-b0be-4ade-a40b-ee0b55bdfc7c', '2026-03-30 19:20:01.129', NULL, NULL, NULL, NULL, 982);
INSERT INTO "public"."Uploads" VALUES (947, 'ตง.ถ.2-0119 ถนนเพลินพิทักษ์ ซอย 27.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0119 ถนนเพลินพิทักษ์ ซอย 27.jpg', 'image', NULL, '5cf38519-c49d-4d64-89d7-07494f3a9a93', '2026-03-30 19:20:01.13', NULL, NULL, NULL, NULL, 982);
INSERT INTO "public"."Uploads" VALUES (948, 'ตง.ถ.2-0119 ถนนเพลินพิทักษ์ ซอย 28.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0119 ถนนเพลินพิทักษ์ ซอย 28.jpg', 'image', NULL, '9e54f8e3-e647-4249-9602-aa70d8ac8ae6', '2026-03-30 19:20:01.131', NULL, NULL, NULL, NULL, 982);
INSERT INTO "public"."Uploads" VALUES (949, 'ตง.ถ.2-0119 ถนนเพลินพิทักษ์ ซอย 29.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0119 ถนนเพลินพิทักษ์ ซอย 29.jpg', 'image', NULL, '9ea77355-8574-4e87-9ad4-fd9fb439b815', '2026-03-30 19:20:01.131', NULL, NULL, NULL, NULL, 982);
INSERT INTO "public"."Uploads" VALUES (950, 'ตง.ถ.2-0120 ถนนเพลินพิทักษ์ ซอย 41.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0120 ถนนเพลินพิทักษ์ ซอย 41.jpg', 'image', NULL, '0136bfe2-98f2-4456-b9cb-cf2c95105207', '2026-03-30 19:20:01.132', NULL, NULL, NULL, NULL, 983);
INSERT INTO "public"."Uploads" VALUES (951, 'ตง.ถ.2-0120 ถนนเพลินพิทักษ์ ซอย 42.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0120 ถนนเพลินพิทักษ์ ซอย 42.jpg', 'image', NULL, '6a41ab59-77e8-481b-b6bb-758e6eb54be1', '2026-03-30 19:20:01.133', NULL, NULL, NULL, NULL, 983);
INSERT INTO "public"."Uploads" VALUES (952, 'ตง.ถ.2-0120 ถนนเพลินพิทักษ์ ซอย 43.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0120 ถนนเพลินพิทักษ์ ซอย 43.jpg', 'image', NULL, '65f4e5c6-5f0d-4f9f-b24c-91aa2638095a', '2026-03-30 19:20:01.133', NULL, NULL, NULL, NULL, 983);
INSERT INTO "public"."Uploads" VALUES (953, 'ตง.ถ.2-0120 ถนนเพลินพิทักษ์ ซอย 44.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0120 ถนนเพลินพิทักษ์ ซอย 44.jpg', 'image', NULL, '152c8388-82a8-4bd6-b039-4ec9f78b369f', '2026-03-30 19:20:01.134', NULL, NULL, NULL, NULL, 983);
INSERT INTO "public"."Uploads" VALUES (954, 'ตง.ถ.2-0120 ถนนเพลินพิทักษ์ ซอย 45.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0120 ถนนเพลินพิทักษ์ ซอย 45.jpg', 'image', NULL, '2a20e1b5-90e5-4ecb-bbce-88e589b9c334', '2026-03-30 19:20:01.135', NULL, NULL, NULL, NULL, 983);
INSERT INTO "public"."Uploads" VALUES (955, 'ตง.ถ.2-0120 ถนนเพลินพิทักษ์ ซอย 46.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0120 ถนนเพลินพิทักษ์ ซอย 46.jpg', 'image', NULL, '852eb3bf-cd6b-43d1-bc2a-4b04cada59c8', '2026-03-30 19:20:01.135', NULL, NULL, NULL, NULL, 983);
INSERT INTO "public"."Uploads" VALUES (956, 'ตง.ถ.2-0120 ถนนเพลินพิทักษ์ ซอย 47.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0120 ถนนเพลินพิทักษ์ ซอย 47.jpg', 'image', NULL, 'f0316b75-c53b-4332-9535-5217048fca78', '2026-03-30 19:20:01.136', NULL, NULL, NULL, NULL, 983);
INSERT INTO "public"."Uploads" VALUES (957, 'ตง.ถ.2-0120 ถนนเพลินพิทักษ์ ซอย 48.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0120 ถนนเพลินพิทักษ์ ซอย 48.jpg', 'image', NULL, '36e8b96f-6dc2-4520-8577-6ad558a92fc5', '2026-03-30 19:20:01.136', NULL, NULL, NULL, NULL, 983);
INSERT INTO "public"."Uploads" VALUES (958, 'ตง.ถ.2-0120 ถนนเพลินพิทักษ์ ซอย 49.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0120 ถนนเพลินพิทักษ์ ซอย 49.jpg', 'image', NULL, '14dbb6da-cc9d-4fd4-a32a-fb3d1a4c8b2c', '2026-03-30 19:20:01.137', NULL, NULL, NULL, NULL, 983);
INSERT INTO "public"."Uploads" VALUES (959, 'ตง.ถ.2-0121 ถนนเพลินพิทักษ์ ซอย6(โกดำ)1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0121 ถนนเพลินพิทักษ์ ซอย6(โกดำ)1.jpg', 'image', NULL, '597432a4-d762-4f36-9407-ff3b01ce36b6', '2026-03-30 19:20:01.137', NULL, NULL, NULL, NULL, 984);
INSERT INTO "public"."Uploads" VALUES (960, 'ตง.ถ.2-0121 ถนนเพลินพิทักษ์ ซอย6(โกดำ)2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0121 ถนนเพลินพิทักษ์ ซอย6(โกดำ)2.jpg', 'image', NULL, 'cc1e7615-c01c-40cc-8994-29dabacd75f4', '2026-03-30 19:20:01.138', NULL, NULL, NULL, NULL, 984);
INSERT INTO "public"."Uploads" VALUES (961, 'ตง.ถ.2-0121 ถนนเพลินพิทักษ์ ซอย6(โกดำ)3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0121 ถนนเพลินพิทักษ์ ซอย6(โกดำ)3.jpg', 'image', NULL, 'b20bfe30-6d74-4f47-98f1-bfe765cefc2a', '2026-03-30 19:20:01.139', NULL, NULL, NULL, NULL, 984);
INSERT INTO "public"."Uploads" VALUES (962, 'ตง.ถ.2-0121 ถนนเพลินพิทักษ์ ซอย6(โกดำ)4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0121 ถนนเพลินพิทักษ์ ซอย6(โกดำ)4.jpg', 'image', NULL, 'e1f85f16-5452-4cf5-a2ad-58220108e3ad', '2026-03-30 19:20:01.14', NULL, NULL, NULL, NULL, 984);
INSERT INTO "public"."Uploads" VALUES (963, 'ตง.ถ.2-0121 ถนนเพลินพิทักษ์ ซอย6(โกดำ)5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0121 ถนนเพลินพิทักษ์ ซอย6(โกดำ)5.jpg', 'image', NULL, '0110fcf1-bafc-42c1-b754-29efc7b9d890', '2026-03-30 19:20:01.14', NULL, NULL, NULL, NULL, 984);
INSERT INTO "public"."Uploads" VALUES (964, 'ตง.ถ.2-0121 ถนนเพลินพิทักษ์ ซอย6(โกดำ)6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0121 ถนนเพลินพิทักษ์ ซอย6(โกดำ)6.jpg', 'image', NULL, '89e83c04-0b48-4cb3-bfc8-3357698cb560', '2026-03-30 19:20:01.141', NULL, NULL, NULL, NULL, 984);
INSERT INTO "public"."Uploads" VALUES (965, 'ตง.ถ.2-0121 ถนนเพลินพิทักษ์ ซอย6(โกดำ)7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0121 ถนนเพลินพิทักษ์ ซอย6(โกดำ)7.jpg', 'image', NULL, '8f847c49-ef18-49f0-8504-0fe2ff34d523', '2026-03-30 19:20:01.141', NULL, NULL, NULL, NULL, 984);
INSERT INTO "public"."Uploads" VALUES (966, 'ตง.ถ.2-0121 ถนนเพลินพิทักษ์ ซอย6(โกดำ)8.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0121 ถนนเพลินพิทักษ์ ซอย6(โกดำ)8.jpg', 'image', NULL, '01b5773d-c848-467a-9a75-a0bd261e7828', '2026-03-30 19:20:01.142', NULL, NULL, NULL, NULL, 984);
INSERT INTO "public"."Uploads" VALUES (326, 'ตง.ถ.2-0041 ถนนกันตังซอย 21.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0041 ถนนกันตังซอย 21.jpg', 'image', NULL, '4a1d3e73-d768-4e8c-b0cd-069e0651fde5', '2026-03-30 19:20:00.731', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (967, 'ตง.ถ.2-0121 ถนนเพลินพิทักษ์ ซอย6(โกดำ)9.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0121 ถนนเพลินพิทักษ์ ซอย6(โกดำ)9.jpg', 'image', NULL, 'c4549430-f531-456c-ae99-f50a8fae2888', '2026-03-30 19:20:01.142', NULL, NULL, NULL, NULL, 984);
INSERT INTO "public"."Uploads" VALUES (968, 'ตง.ถ.2-0122 ถนนเพลินพิทักษ์ ซอย 81.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0122 ถนนเพลินพิทักษ์ ซอย 81.jpg', 'image', NULL, 'a49d8830-9f0f-4754-9759-a15ab7d31676', '2026-03-30 19:20:01.143', NULL, NULL, NULL, NULL, 985);
INSERT INTO "public"."Uploads" VALUES (969, 'ตง.ถ.2-0122 ถนนเพลินพิทักษ์ ซอย 82.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0122 ถนนเพลินพิทักษ์ ซอย 82.jpg', 'image', NULL, '7176ea12-1fa2-4b16-8c9e-819a3943e5cb', '2026-03-30 19:20:01.143', NULL, NULL, NULL, NULL, 985);
INSERT INTO "public"."Uploads" VALUES (970, 'ตง.ถ.2-0122 ถนนเพลินพิทักษ์ ซอย 83.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0122 ถนนเพลินพิทักษ์ ซอย 83.jpg', 'image', NULL, '378af0b8-0ec2-424e-b2a7-f6b1f9b668d5', '2026-03-30 19:20:01.144', NULL, NULL, NULL, NULL, 985);
INSERT INTO "public"."Uploads" VALUES (971, 'ตง.ถ.2-0122 ถนนเพลินพิทักษ์ ซอย 84.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0122 ถนนเพลินพิทักษ์ ซอย 84.jpg', 'image', NULL, 'ee60c0ac-3e71-4fda-a664-2768f302019e', '2026-03-30 19:20:01.145', NULL, NULL, NULL, NULL, 985);
INSERT INTO "public"."Uploads" VALUES (972, 'ตง.ถ.2-0122 ถนนเพลินพิทักษ์ ซอย 85.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0122 ถนนเพลินพิทักษ์ ซอย 85.jpg', 'image', NULL, '33256693-f9a0-4154-9282-79631f72104d', '2026-03-30 19:20:01.146', NULL, NULL, NULL, NULL, 985);
INSERT INTO "public"."Uploads" VALUES (973, 'ตง.ถ.2-0122 ถนนเพลินพิทักษ์ ซอย 86.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0122 ถนนเพลินพิทักษ์ ซอย 86.jpg', 'image', NULL, 'e0907572-70dc-40cc-968d-007e59272f46', '2026-03-30 19:20:01.147', NULL, NULL, NULL, NULL, 985);
INSERT INTO "public"."Uploads" VALUES (974, 'ตง.ถ.2-0122 ถนนเพลินพิทักษ์ ซอย 87.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0122 ถนนเพลินพิทักษ์ ซอย 87.jpg', 'image', NULL, '700d1398-4ea4-4868-8718-3e1751ec2354', '2026-03-30 19:20:01.147', NULL, NULL, NULL, NULL, 985);
INSERT INTO "public"."Uploads" VALUES (975, 'ตง.ถ.2-0122 ถนนเพลินพิทักษ์ ซอย 88.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0122 ถนนเพลินพิทักษ์ ซอย 88.jpg', 'image', NULL, '36973c1c-ff07-453d-8bf0-cda66e498c2f', '2026-03-30 19:20:01.148', NULL, NULL, NULL, NULL, 985);
INSERT INTO "public"."Uploads" VALUES (976, 'ตง.ถ.2-0122 ถนนเพลินพิทักษ์ ซอย 89.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0122 ถนนเพลินพิทักษ์ ซอย 89.jpg', 'image', NULL, 'ff48587a-b047-4cd6-9c13-ee58044e5a25', '2026-03-30 19:20:01.149', NULL, NULL, NULL, NULL, 985);
INSERT INTO "public"."Uploads" VALUES (977, 'ตง.ถ.2-0123 ถนนเพลินพิทักษ์ ซอย101.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0123 ถนนเพลินพิทักษ์ ซอย101.jpg', 'image', NULL, '9b516890-9c64-4f0a-8379-e7bf283aaec8', '2026-03-30 19:20:01.149', NULL, NULL, NULL, NULL, 986);
INSERT INTO "public"."Uploads" VALUES (978, 'ตง.ถ.2-0123 ถนนเพลินพิทักษ์ ซอย102.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0123 ถนนเพลินพิทักษ์ ซอย102.jpg', 'image', NULL, '8709af4a-65c3-4ed8-beb6-2e4294fe9c88', '2026-03-30 19:20:01.149', NULL, NULL, NULL, NULL, 986);
INSERT INTO "public"."Uploads" VALUES (979, 'ตง.ถ.2-0123 ถนนเพลินพิทักษ์ ซอย103.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0123 ถนนเพลินพิทักษ์ ซอย103.jpg', 'image', NULL, '08bf1949-622b-44b8-94c6-c5f127a4c76f', '2026-03-30 19:20:01.15', NULL, NULL, NULL, NULL, 986);
INSERT INTO "public"."Uploads" VALUES (980, 'ตง.ถ.2-0123 ถนนเพลินพิทักษ์ ซอย104.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0123 ถนนเพลินพิทักษ์ ซอย104.jpg', 'image', NULL, '5fa27073-0d5f-43df-b2dd-ee948ff97276', '2026-03-30 19:20:01.151', NULL, NULL, NULL, NULL, 986);
INSERT INTO "public"."Uploads" VALUES (981, 'ตง.ถ.2-0123 ถนนเพลินพิทักษ์ ซอย105.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0123 ถนนเพลินพิทักษ์ ซอย105.jpg', 'image', NULL, '2f9d8be8-1a6a-4abe-a0be-91066931911d', '2026-03-30 19:20:01.151', NULL, NULL, NULL, NULL, 986);
INSERT INTO "public"."Uploads" VALUES (982, 'ตง.ถ.2-0123 ถนนเพลินพิทักษ์ ซอย106.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0123 ถนนเพลินพิทักษ์ ซอย106.jpg', 'image', NULL, '3f89cd9f-7d1b-4802-9d26-9a8cc5bed25c', '2026-03-30 19:20:01.152', NULL, NULL, NULL, NULL, 986);
INSERT INTO "public"."Uploads" VALUES (983, 'ตง.ถ.2-0123 ถนนเพลินพิทักษ์ ซอย107.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0123 ถนนเพลินพิทักษ์ ซอย107.jpg', 'image', NULL, '1105bb6b-9183-4094-8478-71f430157df7', '2026-03-30 19:20:01.153', NULL, NULL, NULL, NULL, 986);
INSERT INTO "public"."Uploads" VALUES (984, 'ตง.ถ.2-0123 ถนนเพลินพิทักษ์ ซอย108.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0123 ถนนเพลินพิทักษ์ ซอย108.jpg', 'image', NULL, 'd578b447-4b3c-4ba8-b755-3d58262f9db5', '2026-03-30 19:20:01.153', NULL, NULL, NULL, NULL, 986);
INSERT INTO "public"."Uploads" VALUES (985, 'ตง.ถ.2-0123 ถนนเพลินพิทักษ์ ซอย109.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0123 ถนนเพลินพิทักษ์ ซอย109.jpg', 'image', NULL, '990627df-fbf4-4e07-a7db-1fefd2b78b7e', '2026-03-30 19:20:01.154', NULL, NULL, NULL, NULL, 986);
INSERT INTO "public"."Uploads" VALUES (995, 'ตง.ถ.2-0125 ถนนเพลินพิทักษ์ ซอยแยก ซอย 141.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0125 ถนนเพลินพิทักษ์ ซอยแยก ซอย 141.jpg', 'image', NULL, '43f995cf-f3d5-426f-a14c-3487e5c14a9b', '2026-03-30 19:20:01.16', NULL, NULL, NULL, NULL, 988);
INSERT INTO "public"."Uploads" VALUES (996, 'ตง.ถ.2-0125 ถนนเพลินพิทักษ์ ซอยแยก ซอย 142.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0125 ถนนเพลินพิทักษ์ ซอยแยก ซอย 142.jpg', 'image', NULL, '82396ed0-4d3a-4e38-a1e0-558c04454050', '2026-03-30 19:20:01.161', NULL, NULL, NULL, NULL, 988);
INSERT INTO "public"."Uploads" VALUES (997, 'ตง.ถ.2-0125 ถนนเพลินพิทักษ์ ซอยแยก ซอย 143.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0125 ถนนเพลินพิทักษ์ ซอยแยก ซอย 143.jpg', 'image', NULL, '10702a2b-3eb9-4390-b22c-be00eda8720c', '2026-03-30 19:20:01.162', NULL, NULL, NULL, NULL, 988);
INSERT INTO "public"."Uploads" VALUES (998, 'ตง.ถ.2-0125 ถนนเพลินพิทักษ์ ซอยแยก ซอย 144.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0125 ถนนเพลินพิทักษ์ ซอยแยก ซอย 144.jpg', 'image', NULL, '72359541-f1cf-460e-ab44-a658f0fdd73d', '2026-03-30 19:20:01.162', NULL, NULL, NULL, NULL, 988);
INSERT INTO "public"."Uploads" VALUES (999, 'ตง.ถ.2-0125 ถนนเพลินพิทักษ์ ซอยแยก ซอย 145.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0125 ถนนเพลินพิทักษ์ ซอยแยก ซอย 145.jpg', 'image', NULL, '416bee9c-10b0-498e-8e83-1b76637e4578', '2026-03-30 19:20:01.163', NULL, NULL, NULL, NULL, 988);
INSERT INTO "public"."Uploads" VALUES (1000, 'ตง.ถ.2-0125 ถนนเพลินพิทักษ์ ซอยแยก ซอย 146.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0125 ถนนเพลินพิทักษ์ ซอยแยก ซอย 146.jpg', 'image', NULL, 'b0902ddc-9454-41e1-84b6-dbcdff87109b', '2026-03-30 19:20:01.163', NULL, NULL, NULL, NULL, 988);
INSERT INTO "public"."Uploads" VALUES (1001, 'ตง.ถ.2-0125 ถนนเพลินพิทักษ์ ซอยแยก ซอย 147.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0125 ถนนเพลินพิทักษ์ ซอยแยก ซอย 147.jpg', 'image', NULL, '16469c2f-fcf8-4ec1-bed5-981a9c5bce04', '2026-03-30 19:20:01.164', NULL, NULL, NULL, NULL, 988);
INSERT INTO "public"."Uploads" VALUES (1002, 'ตง.ถ.2-0125 ถนนเพลินพิทักษ์ ซอยแยก ซอย 148.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0125 ถนนเพลินพิทักษ์ ซอยแยก ซอย 148.jpg', 'image', NULL, '70b6a30a-3721-4d09-ad7d-58bea04f712a', '2026-03-30 19:20:01.164', NULL, NULL, NULL, NULL, 988);
INSERT INTO "public"."Uploads" VALUES (1003, 'ตง.ถ.2-0125 ถนนเพลินพิทักษ์ ซอยแยก ซอย 149.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0125 ถนนเพลินพิทักษ์ ซอยแยก ซอย 149.jpg', 'image', NULL, '42e3e0fa-25a3-4177-ba11-b28ca68ecb8f', '2026-03-30 19:20:01.165', NULL, NULL, NULL, NULL, 988);
INSERT INTO "public"."Uploads" VALUES (1004, 'ตง.ถ.2-0126 ถนนเวียนกะพัง ซอย 11.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0126 ถนนเวียนกะพัง ซอย 11.jpg', 'image', NULL, '1ab447b8-d56f-4fd5-b2f0-012c84a1e27c', '2026-03-30 19:20:01.165', NULL, NULL, NULL, NULL, 989);
INSERT INTO "public"."Uploads" VALUES (361, 'ตง.ถ.2-0046 ถนนกันตังซอย 91.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0046 ถนนกันตังซอย 91.jpg', 'image', NULL, 'e4553a14-de30-41f7-a0cb-c5a994116a95', '2026-03-30 19:20:00.752', NULL, NULL, NULL, NULL, 910);
INSERT INTO "public"."Uploads" VALUES (1005, 'ตง.ถ.2-0126 ถนนเวียนกะพัง ซอย 12.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0126 ถนนเวียนกะพัง ซอย 12.jpg', 'image', NULL, '54a90532-3737-4700-9207-f82a524096a6', '2026-03-30 19:20:01.166', NULL, NULL, NULL, NULL, 989);
INSERT INTO "public"."Uploads" VALUES (1006, 'ตง.ถ.2-0126 ถนนเวียนกะพัง ซอย 13.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0126 ถนนเวียนกะพัง ซอย 13.jpg', 'image', NULL, '4fb1b0b5-1734-4667-b5d2-58670ef0e1e7', '2026-03-30 19:20:01.167', NULL, NULL, NULL, NULL, 989);
INSERT INTO "public"."Uploads" VALUES (1007, 'ตง.ถ.2-0126 ถนนเวียนกะพัง ซอย 14.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0126 ถนนเวียนกะพัง ซอย 14.jpg', 'image', NULL, 'd0b728b3-527c-46d8-bd18-396bab91668e', '2026-03-30 19:20:01.167', NULL, NULL, NULL, NULL, 989);
INSERT INTO "public"."Uploads" VALUES (1008, 'ตง.ถ.2-0126 ถนนเวียนกะพัง ซอย 15.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0126 ถนนเวียนกะพัง ซอย 15.jpg', 'image', NULL, 'c91fa24f-7063-4981-83a9-ae28269090a0', '2026-03-30 19:20:01.168', NULL, NULL, NULL, NULL, 989);
INSERT INTO "public"."Uploads" VALUES (1009, 'ตง.ถ.2-0126 ถนนเวียนกะพัง ซอย 16.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0126 ถนนเวียนกะพัง ซอย 16.jpg', 'image', NULL, '12866f56-edb4-4596-b23c-1e79fac6a925', '2026-03-30 19:20:01.169', NULL, NULL, NULL, NULL, 989);
INSERT INTO "public"."Uploads" VALUES (1010, 'ตง.ถ.2-0126 ถนนเวียนกะพัง ซอย 17.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0126 ถนนเวียนกะพัง ซอย 17.jpg', 'image', NULL, 'd2d574c6-c9e7-4974-8663-8d273f8dd8d4', '2026-03-30 19:20:01.17', NULL, NULL, NULL, NULL, 989);
INSERT INTO "public"."Uploads" VALUES (1011, 'ตง.ถ.2-0126 ถนนเวียนกะพัง ซอย 18.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0126 ถนนเวียนกะพัง ซอย 18.jpg', 'image', NULL, '4aa4c74f-d94f-43f1-8c79-915d7d4e84d1', '2026-03-30 19:20:01.17', NULL, NULL, NULL, NULL, 989);
INSERT INTO "public"."Uploads" VALUES (1012, 'ตง.ถ.2-0126 ถนนเวียนกะพัง ซอย 19.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0126 ถนนเวียนกะพัง ซอย 19.jpg', 'image', NULL, '41389884-6ce8-4dbd-82e9-db2a68a75394', '2026-03-30 19:20:01.171', NULL, NULL, NULL, NULL, 989);
INSERT INTO "public"."Uploads" VALUES (1013, 'ตง.ถ.2-0127 ถนเวียนกะพัง ซอย 21.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0127 ถนเวียนกะพัง ซอย 21.jpg', 'image', NULL, 'f83f55b9-c761-4c5e-923c-8d1336d2b8be', '2026-03-30 19:20:01.171', NULL, NULL, NULL, NULL, 990);
INSERT INTO "public"."Uploads" VALUES (1014, 'ตง.ถ.2-0127 ถนเวียนกะพัง ซอย 22.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0127 ถนเวียนกะพัง ซอย 22.jpg', 'image', NULL, '7e6edb21-7100-41e1-96b8-37e7d7377018', '2026-03-30 19:20:01.172', NULL, NULL, NULL, NULL, 990);
INSERT INTO "public"."Uploads" VALUES (1015, 'ตง.ถ.2-0127 ถนเวียนกะพัง ซอย 23.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0127 ถนเวียนกะพัง ซอย 23.jpg', 'image', NULL, '4877cf0e-91db-48ff-85e4-3dbf258ea3f7', '2026-03-30 19:20:01.173', NULL, NULL, NULL, NULL, 990);
INSERT INTO "public"."Uploads" VALUES (1016, 'ตง.ถ.2-0127 ถนเวียนกะพัง ซอย 24.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0127 ถนเวียนกะพัง ซอย 24.jpg', 'image', NULL, '5011092a-174e-480e-9eb8-dc3481429abd', '2026-03-30 19:20:01.174', NULL, NULL, NULL, NULL, 990);
INSERT INTO "public"."Uploads" VALUES (1017, 'ตง.ถ.2-0127 ถนเวียนกะพัง ซอย 25.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0127 ถนเวียนกะพัง ซอย 25.jpg', 'image', NULL, 'f7e1645c-7180-4690-b7d9-9bb6e4d8d9ea', '2026-03-30 19:20:01.175', NULL, NULL, NULL, NULL, 990);
INSERT INTO "public"."Uploads" VALUES (1018, 'ตง.ถ.2-0127 ถนเวียนกะพัง ซอย 26.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0127 ถนเวียนกะพัง ซอย 26.jpg', 'image', NULL, '72cffea0-e0ed-452f-bb0a-b02169024cc9', '2026-03-30 19:20:01.176', NULL, NULL, NULL, NULL, 990);
INSERT INTO "public"."Uploads" VALUES (1019, 'ตง.ถ.2-0127 ถนเวียนกะพัง ซอย 27.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0127 ถนเวียนกะพัง ซอย 27.jpg', 'image', NULL, 'e9073961-b416-4661-935d-735166261cfe', '2026-03-30 19:20:01.176', NULL, NULL, NULL, NULL, 990);
INSERT INTO "public"."Uploads" VALUES (1020, 'ตง.ถ.2-0127 ถนเวียนกะพัง ซอย 28.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0127 ถนเวียนกะพัง ซอย 28.jpg', 'image', NULL, '58775259-7318-4bc0-b403-edc68093a7c8', '2026-03-30 19:20:01.177', NULL, NULL, NULL, NULL, 990);
INSERT INTO "public"."Uploads" VALUES (1021, 'ตง.ถ.2-0127 ถนเวียนกะพัง ซอย 29.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0127 ถนเวียนกะพัง ซอย 29.jpg', 'image', NULL, '1a8beaf3-944e-48a5-a4c6-e87be6ee2db3', '2026-03-30 19:20:01.177', NULL, NULL, NULL, NULL, 990);
INSERT INTO "public"."Uploads" VALUES (1022, 'ตง.ถ.2-0128 ถนเวียนกะพัง ซอย 41.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0128 ถนเวียนกะพัง ซอย 41.jpg', 'image', NULL, '9b21e4dc-dc83-4320-bd8c-d9552e1f3a9b', '2026-03-30 19:20:01.178', NULL, NULL, NULL, NULL, 991);
INSERT INTO "public"."Uploads" VALUES (1023, 'ตง.ถ.2-0128 ถนเวียนกะพัง ซอย 42.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0128 ถนเวียนกะพัง ซอย 42.jpg', 'image', NULL, '5ede0356-45a8-4425-ad0c-405d276322ef', '2026-03-30 19:20:01.178', NULL, NULL, NULL, NULL, 991);
INSERT INTO "public"."Uploads" VALUES (1024, 'ตง.ถ.2-0128 ถนเวียนกะพัง ซอย 43.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0128 ถนเวียนกะพัง ซอย 43.jpg', 'image', NULL, '3fe29ec7-5229-48a0-86fe-344ba68bbc1d', '2026-03-30 19:20:01.179', NULL, NULL, NULL, NULL, 991);
INSERT INTO "public"."Uploads" VALUES (1025, 'ตง.ถ.2-0128 ถนเวียนกะพัง ซอย 44.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0128 ถนเวียนกะพัง ซอย 44.jpg', 'image', NULL, '477f3c84-2e5d-4751-a187-a6b79b7b71a8', '2026-03-30 19:20:01.179', NULL, NULL, NULL, NULL, 991);
INSERT INTO "public"."Uploads" VALUES (1026, 'ตง.ถ.2-0128 ถนเวียนกะพัง ซอย 45.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0128 ถนเวียนกะพัง ซอย 45.jpg', 'image', NULL, 'bb4ccd0c-f395-468b-999d-ca505d1bf7cf', '2026-03-30 19:20:01.18', NULL, NULL, NULL, NULL, 991);
INSERT INTO "public"."Uploads" VALUES (1027, 'ตง.ถ.2-0128 ถนเวียนกะพัง ซอย 46.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0128 ถนเวียนกะพัง ซอย 46.jpg', 'image', NULL, '18c5b575-7c7f-420a-9a23-7e97ed126158', '2026-03-30 19:20:01.181', NULL, NULL, NULL, NULL, 991);
INSERT INTO "public"."Uploads" VALUES (1028, 'ตง.ถ.2-0128 ถนเวียนกะพัง ซอย 47.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0128 ถนเวียนกะพัง ซอย 47.jpg', 'image', NULL, '361c0f13-7404-4103-bc48-63e3021a8f08', '2026-03-30 19:20:01.182', NULL, NULL, NULL, NULL, 991);
INSERT INTO "public"."Uploads" VALUES (1029, 'ตง.ถ.2-0128 ถนเวียนกะพัง ซอย 48.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0128 ถนเวียนกะพัง ซอย 48.jpg', 'image', NULL, 'b193dcf7-7db3-4649-9cf5-87fcc68ab6ec', '2026-03-30 19:20:01.182', NULL, NULL, NULL, NULL, 991);
INSERT INTO "public"."Uploads" VALUES (1030, 'ตง.ถ.2-0128 ถนเวียนกะพัง ซอย 49.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0128 ถนเวียนกะพัง ซอย 49.jpg', 'image', NULL, '46cad76b-c9c2-446c-958b-64889e4a7e41', '2026-03-30 19:20:01.183', NULL, NULL, NULL, NULL, 991);
INSERT INTO "public"."Uploads" VALUES (1040, 'ตง.ถ.2-0130 ถนเวียนกะพัง ซอย 81.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0130 ถนเวียนกะพัง ซอย 81.jpg', 'image', NULL, 'a882f9db-501a-4141-b51d-1f1553868bad', '2026-03-30 19:20:01.189', NULL, NULL, NULL, NULL, 992);
INSERT INTO "public"."Uploads" VALUES (1041, 'ตง.ถ.2-0130 ถนเวียนกะพัง ซอย 82.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0130 ถนเวียนกะพัง ซอย 82.jpg', 'image', NULL, '0b173e15-2a97-4f6c-9487-01d19545c512', '2026-03-30 19:20:01.189', NULL, NULL, NULL, NULL, 992);
INSERT INTO "public"."Uploads" VALUES (1042, 'ตง.ถ.2-0130 ถนเวียนกะพัง ซอย 83.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0130 ถนเวียนกะพัง ซอย 83.jpg', 'image', NULL, 'f13ea435-5fac-46cf-9ce9-7ae767ce8b9e', '2026-03-30 19:20:01.19', NULL, NULL, NULL, NULL, 992);
INSERT INTO "public"."Uploads" VALUES (1043, 'ตง.ถ.2-0130 ถนเวียนกะพัง ซอย 84.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0130 ถนเวียนกะพัง ซอย 84.jpg', 'image', NULL, '911d1c09-1d6f-4f51-a94a-f6734e917375', '2026-03-30 19:20:01.19', NULL, NULL, NULL, NULL, 992);
INSERT INTO "public"."Uploads" VALUES (1044, 'ตง.ถ.2-0130 ถนเวียนกะพัง ซอย 85.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0130 ถนเวียนกะพัง ซอย 85.jpg', 'image', NULL, '27a0bf54-d8f0-4299-84f4-5a8d3040e99d', '2026-03-30 19:20:01.191', NULL, NULL, NULL, NULL, 992);
INSERT INTO "public"."Uploads" VALUES (1045, 'ตง.ถ.2-0130 ถนเวียนกะพัง ซอย 86.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0130 ถนเวียนกะพัง ซอย 86.jpg', 'image', NULL, '76292a73-834f-4f54-8796-d03b12b8e201', '2026-03-30 19:20:01.191', NULL, NULL, NULL, NULL, 992);
INSERT INTO "public"."Uploads" VALUES (1046, 'ตง.ถ.2-0130 ถนเวียนกะพัง ซอย 87.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0130 ถนเวียนกะพัง ซอย 87.jpg', 'image', NULL, '5f57a930-44ce-4ce7-979e-d54f52c2d340', '2026-03-30 19:20:01.192', NULL, NULL, NULL, NULL, 992);
INSERT INTO "public"."Uploads" VALUES (1047, 'ตง.ถ.2-0130 ถนเวียนกะพัง ซอย 88.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0130 ถนเวียนกะพัง ซอย 88.jpg', 'image', NULL, '2febf838-d077-499a-92c0-ca303838464f', '2026-03-30 19:20:01.192', NULL, NULL, NULL, NULL, 992);
INSERT INTO "public"."Uploads" VALUES (1048, 'ตง.ถ.2-0130 ถนเวียนกะพัง ซอย 89.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0130 ถนเวียนกะพัง ซอย 89.jpg', 'image', NULL, 'b01e293a-f25d-43da-a2ef-3cdd4b43f20e', '2026-03-30 19:20:01.193', NULL, NULL, NULL, NULL, 992);
INSERT INTO "public"."Uploads" VALUES (1049, 'ตง.ถ.2-0131 ถนเวียนกะพัง ซอย 101.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0131 ถนเวียนกะพัง ซอย 101.jpg', 'image', NULL, '07a7c6e7-e56b-4bb2-8937-84cedd4e0280', '2026-03-30 19:20:01.194', NULL, NULL, NULL, NULL, 993);
INSERT INTO "public"."Uploads" VALUES (1050, 'ตง.ถ.2-0131 ถนเวียนกะพัง ซอย 102.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0131 ถนเวียนกะพัง ซอย 102.jpg', 'image', NULL, '76c94053-a461-4df8-846e-2a7e0425e170', '2026-03-30 19:20:01.194', NULL, NULL, NULL, NULL, 993);
INSERT INTO "public"."Uploads" VALUES (1051, 'ตง.ถ.2-0131 ถนเวียนกะพัง ซอย 103.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0131 ถนเวียนกะพัง ซอย 103.jpg', 'image', NULL, 'feec4802-262f-4bd3-bb78-32a16ad23ff8', '2026-03-30 19:20:01.195', NULL, NULL, NULL, NULL, 993);
INSERT INTO "public"."Uploads" VALUES (1052, 'ตง.ถ.2-0131 ถนเวียนกะพัง ซอย 104.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0131 ถนเวียนกะพัง ซอย 104.jpg', 'image', NULL, 'c50611ef-14ed-4ded-a6e6-460cb24a0ba5', '2026-03-30 19:20:01.196', NULL, NULL, NULL, NULL, 993);
INSERT INTO "public"."Uploads" VALUES (1053, 'ตง.ถ.2-0131 ถนเวียนกะพัง ซอย 105.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0131 ถนเวียนกะพัง ซอย 105.jpg', 'image', NULL, '3ac3fa09-7d5c-4ac3-91ad-3b76a49f2eed', '2026-03-30 19:20:01.197', NULL, NULL, NULL, NULL, 993);
INSERT INTO "public"."Uploads" VALUES (1054, 'ตง.ถ.2-0131 ถนเวียนกะพัง ซอย 106.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0131 ถนเวียนกะพัง ซอย 106.jpg', 'image', NULL, '0f4ecdf3-10f8-41c0-adc6-45a220b932cc', '2026-03-30 19:20:01.197', NULL, NULL, NULL, NULL, 993);
INSERT INTO "public"."Uploads" VALUES (1055, 'ตง.ถ.2-0131 ถนเวียนกะพัง ซอย 107.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0131 ถนเวียนกะพัง ซอย 107.jpg', 'image', NULL, 'dfef664d-988f-499d-9ed0-3942dde7a596', '2026-03-30 19:20:01.198', NULL, NULL, NULL, NULL, 993);
INSERT INTO "public"."Uploads" VALUES (1056, 'ตง.ถ.2-0131 ถนเวียนกะพัง ซอย 108.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0131 ถนเวียนกะพัง ซอย 108.jpg', 'image', NULL, '196223ee-90f6-4744-8654-0580108d372a', '2026-03-30 19:20:01.198', NULL, NULL, NULL, NULL, 993);
INSERT INTO "public"."Uploads" VALUES (1057, 'ตง.ถ.2-0131 ถนเวียนกะพัง ซอย 109.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0131 ถนเวียนกะพัง ซอย 109.jpg', 'image', NULL, '089c5a0c-8712-4477-bb3a-824b93c7d05e', '2026-03-30 19:20:01.199', NULL, NULL, NULL, NULL, 993);
INSERT INTO "public"."Uploads" VALUES (1058, 'ตง.ถ.2-0132 ถนเวียนกะพัง ซอย 121.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0132 ถนเวียนกะพัง ซอย 121.jpg', 'image', NULL, 'afdc230b-5d15-458e-af09-9c6095cc9cd7', '2026-03-30 19:20:01.199', NULL, NULL, NULL, NULL, 994);
INSERT INTO "public"."Uploads" VALUES (1059, 'ตง.ถ.2-0132 ถนเวียนกะพัง ซอย 122.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0132 ถนเวียนกะพัง ซอย 122.jpg', 'image', NULL, '0befc8d5-0625-4ad5-821c-1d51d7477ed2', '2026-03-30 19:20:01.2', NULL, NULL, NULL, NULL, 994);
INSERT INTO "public"."Uploads" VALUES (1060, 'ตง.ถ.2-0132 ถนเวียนกะพัง ซอย 123.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0132 ถนเวียนกะพัง ซอย 123.jpg', 'image', NULL, '10d5600e-174c-4cb5-9332-0ce98fae6b5e', '2026-03-30 19:20:01.2', NULL, NULL, NULL, NULL, 994);
INSERT INTO "public"."Uploads" VALUES (1061, 'ตง.ถ.2-0132 ถนเวียนกะพัง ซอย 124.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0132 ถนเวียนกะพัง ซอย 124.jpg', 'image', NULL, 'd7a154ad-e635-4ee6-a045-24f93fec0736', '2026-03-30 19:20:01.201', NULL, NULL, NULL, NULL, 994);
INSERT INTO "public"."Uploads" VALUES (1062, 'ตง.ถ.2-0132 ถนเวียนกะพัง ซอย 125.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0132 ถนเวียนกะพัง ซอย 125.jpg', 'image', NULL, '76e3cd4c-ca77-428c-a568-8c26564dcf51', '2026-03-30 19:20:01.202', NULL, NULL, NULL, NULL, 994);
INSERT INTO "public"."Uploads" VALUES (1063, 'ตง.ถ.2-0132 ถนเวียนกะพัง ซอย 126.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0132 ถนเวียนกะพัง ซอย 126.jpg', 'image', NULL, '21a57dfe-0c3d-4a36-af80-f17eb3b0b258', '2026-03-30 19:20:01.203', NULL, NULL, NULL, NULL, 994);
INSERT INTO "public"."Uploads" VALUES (1064, 'ตง.ถ.2-0132 ถนเวียนกะพัง ซอย 127.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0132 ถนเวียนกะพัง ซอย 127.jpg', 'image', NULL, 'eec4f795-6625-442e-bbef-e6cd4d330597', '2026-03-30 19:20:01.203', NULL, NULL, NULL, NULL, 994);
INSERT INTO "public"."Uploads" VALUES (1065, 'ตง.ถ.2-0132 ถนเวียนกะพัง ซอย 128.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0132 ถนเวียนกะพัง ซอย 128.jpg', 'image', NULL, '91d1a51b-1c9b-4a93-aaa7-de0bbbd4eea9', '2026-03-30 19:20:01.204', NULL, NULL, NULL, NULL, 994);
INSERT INTO "public"."Uploads" VALUES (1066, 'ตง.ถ.2-0132 ถนเวียนกะพัง ซอย 129.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0132 ถนเวียนกะพัง ซอย 129.jpg', 'image', NULL, '5ca94d70-925c-4fb0-a13a-789849902095', '2026-03-30 19:20:01.204', NULL, NULL, NULL, NULL, 994);
INSERT INTO "public"."Uploads" VALUES (1067, 'ตง.ถ.2-0133 ถนนสังขวิทย์ ซอย 11.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0133 ถนนสังขวิทย์ ซอย 11.jpg', 'image', NULL, 'a9f43da5-3d33-4e86-b256-fbe31a2ea17e', '2026-03-30 19:20:01.205', NULL, NULL, NULL, NULL, 995);
INSERT INTO "public"."Uploads" VALUES (1068, 'ตง.ถ.2-0133 ถนนสังขวิทย์ ซอย 12.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0133 ถนนสังขวิทย์ ซอย 12.jpg', 'image', NULL, 'd91709fb-1826-41b7-b1cc-b0b31d2c15c6', '2026-03-30 19:20:01.205', NULL, NULL, NULL, NULL, 995);
INSERT INTO "public"."Uploads" VALUES (1069, 'ตง.ถ.2-0133 ถนนสังขวิทย์ ซอย 13.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0133 ถนนสังขวิทย์ ซอย 13.jpg', 'image', NULL, 'c823947a-ab20-4492-ab1c-31651a9b699b', '2026-03-30 19:20:01.206', NULL, NULL, NULL, NULL, 995);
INSERT INTO "public"."Uploads" VALUES (1070, 'ตง.ถ.2-0133 ถนนสังขวิทย์ ซอย 14.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0133 ถนนสังขวิทย์ ซอย 14.jpg', 'image', NULL, 'f7188890-3c24-4dc5-b6a8-bd7a1f2d75c2', '2026-03-30 19:20:01.206', NULL, NULL, NULL, NULL, 995);
INSERT INTO "public"."Uploads" VALUES (1071, 'ตง.ถ.2-0133 ถนนสังขวิทย์ ซอย 15.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0133 ถนนสังขวิทย์ ซอย 15.jpg', 'image', NULL, 'b8bb3be5-c9be-4336-b3bc-9622058dd3e7', '2026-03-30 19:20:01.207', NULL, NULL, NULL, NULL, 995);
INSERT INTO "public"."Uploads" VALUES (1072, 'ตง.ถ.2-0133 ถนนสังขวิทย์ ซอย 16.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0133 ถนนสังขวิทย์ ซอย 16.jpg', 'image', NULL, 'e8c90666-c9b7-499c-8021-11a617d125c1', '2026-03-30 19:20:01.207', NULL, NULL, NULL, NULL, 995);
INSERT INTO "public"."Uploads" VALUES (1073, 'ตง.ถ.2-0133 ถนนสังขวิทย์ ซอย 17.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0133 ถนนสังขวิทย์ ซอย 17.jpg', 'image', NULL, '14c9574c-3c25-4012-b2e3-1ba514466045', '2026-03-30 19:20:01.208', NULL, NULL, NULL, NULL, 995);
INSERT INTO "public"."Uploads" VALUES (1074, 'ตง.ถ.2-0133 ถนนสังขวิทย์ ซอย 18.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0133 ถนนสังขวิทย์ ซอย 18.jpg', 'image', NULL, 'ffae522b-cb25-4f93-995a-0f38787ba71a', '2026-03-30 19:20:01.209', NULL, NULL, NULL, NULL, 995);
INSERT INTO "public"."Uploads" VALUES (851, 'ตง.ถ.2-0109 ถนนอุดมลาภ ซอย 11.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0109 ถนนอุดมลาภ ซอย 11.jpg', 'image', NULL, '920bf606-ff46-47cb-a637-245bf4b506ef', '2026-03-30 19:20:01.069', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (852, 'ตง.ถ.2-0109 ถนนอุดมลาภ ซอย 12.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0109 ถนนอุดมลาภ ซอย 12.jpg', 'image', NULL, 'c9e49d66-375c-44a0-9d01-2c1e0938744c', '2026-03-30 19:20:01.07', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (853, 'ตง.ถ.2-0109 ถนนอุดมลาภ ซอย 13.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0109 ถนนอุดมลาภ ซอย 13.jpg', 'image', NULL, '0348d419-e00b-44af-8367-4f2c434a51e9', '2026-03-30 19:20:01.07', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (854, 'ตง.ถ.2-0109 ถนนอุดมลาภ ซอย 14.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0109 ถนนอุดมลาภ ซอย 14.jpg', 'image', NULL, 'ab8bc7fc-049d-4ab4-a48f-26278db2db99', '2026-03-30 19:20:01.071', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (855, 'ตง.ถ.2-0109 ถนนอุดมลาภ ซอย 15.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0109 ถนนอุดมลาภ ซอย 15.jpg', 'image', NULL, 'aa35c2c0-813a-468d-b518-b1431b6afacd', '2026-03-30 19:20:01.072', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (856, 'ตง.ถ.2-0109 ถนนอุดมลาภ ซอย 16.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0109 ถนนอุดมลาภ ซอย 16.jpg', 'image', NULL, '525822af-6598-41a9-8a69-964a2c219314', '2026-03-30 19:20:01.072', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (857, 'ตง.ถ.2-0109 ถนนอุดมลาภ ซอย 17.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0109 ถนนอุดมลาภ ซอย 17.jpg', 'image', NULL, 'bbd27cbe-4745-4da0-afd6-4563f69777cd', '2026-03-30 19:20:01.073', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (858, 'ตง.ถ.2-0109 ถนนอุดมลาภ ซอย 18.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0109 ถนนอุดมลาภ ซอย 18.jpg', 'image', NULL, 'f464ac11-137f-4667-9527-4f72cafe308e', '2026-03-30 19:20:01.073', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (859, 'ตง.ถ.2-0109 ถนนอุดมลาภ ซอย 19.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0109 ถนนอุดมลาภ ซอย 19.jpg', 'image', NULL, 'bbec11fe-7503-4064-81ba-423ed8fa1fab', '2026-03-30 19:20:01.074', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (1075, 'ตง.ถ.2-0133 ถนนสังขวิทย์ ซอย 19.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0133 ถนนสังขวิทย์ ซอย 19.jpg', 'image', NULL, 'c82251da-3231-451e-842a-6e05552683e1', '2026-03-30 19:20:01.209', NULL, NULL, NULL, NULL, 995);
INSERT INTO "public"."Uploads" VALUES (1076, 'ตง.ถ.2-0134 ถนนสังขวิทย์ ซอย 21.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0134 ถนนสังขวิทย์ ซอย 21.jpg', 'image', NULL, '04043ad2-f717-4766-9d3a-6df6967ec996', '2026-03-30 19:20:01.21', NULL, NULL, NULL, NULL, 996);
INSERT INTO "public"."Uploads" VALUES (1077, 'ตง.ถ.2-0134 ถนนสังขวิทย์ ซอย 22.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0134 ถนนสังขวิทย์ ซอย 22.jpg', 'image', NULL, '939eefe0-7598-4f8f-ba2e-56aafab49eab', '2026-03-30 19:20:01.21', NULL, NULL, NULL, NULL, 996);
INSERT INTO "public"."Uploads" VALUES (1078, 'ตง.ถ.2-0134 ถนนสังขวิทย์ ซอย 23.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0134 ถนนสังขวิทย์ ซอย 23.jpg', 'image', NULL, 'b89f6780-1969-439a-b8ef-c7116b0cac62', '2026-03-30 19:20:01.211', NULL, NULL, NULL, NULL, 996);
INSERT INTO "public"."Uploads" VALUES (1079, 'ตง.ถ.2-0134 ถนนสังขวิทย์ ซอย 24.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0134 ถนนสังขวิทย์ ซอย 24.jpg', 'image', NULL, '16c66f38-6fa5-40d2-9751-66a851c66d07', '2026-03-30 19:20:01.211', NULL, NULL, NULL, NULL, 996);
INSERT INTO "public"."Uploads" VALUES (1080, 'ตง.ถ.2-0134 ถนนสังขวิทย์ ซอย 25.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0134 ถนนสังขวิทย์ ซอย 25.jpg', 'image', NULL, '225b2caf-ae2e-4578-840e-0244daaa8d9d', '2026-03-30 19:20:01.212', NULL, NULL, NULL, NULL, 996);
INSERT INTO "public"."Uploads" VALUES (1081, 'ตง.ถ.2-0134 ถนนสังขวิทย์ ซอย 26.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0134 ถนนสังขวิทย์ ซอย 26.jpg', 'image', NULL, '0572b775-ec4d-4c8e-8ffc-74fe63faeeac', '2026-03-30 19:20:01.212', NULL, NULL, NULL, NULL, 996);
INSERT INTO "public"."Uploads" VALUES (1082, 'ตง.ถ.2-0134 ถนนสังขวิทย์ ซอย 27.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0134 ถนนสังขวิทย์ ซอย 27.jpg', 'image', NULL, 'f5c68d98-94c8-4d61-8780-9e1f3e41d85e', '2026-03-30 19:20:01.213', NULL, NULL, NULL, NULL, 996);
INSERT INTO "public"."Uploads" VALUES (1083, 'ตง.ถ.2-0134 ถนนสังขวิทย์ ซอย 28.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0134 ถนนสังขวิทย์ ซอย 28.jpg', 'image', NULL, '3b52216c-76b3-4420-9505-63bd3bf4e39e', '2026-03-30 19:20:01.213', NULL, NULL, NULL, NULL, 996);
INSERT INTO "public"."Uploads" VALUES (1084, 'ตง.ถ.2-0134 ถนนสังขวิทย์ ซอย 29.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0134 ถนนสังขวิทย์ ซอย 29.jpg', 'image', NULL, 'bd81c9db-b6fe-429a-95b9-8bba45291fdc', '2026-03-30 19:20:01.214', NULL, NULL, NULL, NULL, 996);
INSERT INTO "public"."Uploads" VALUES (1085, 'ตง.ถ.2-0135 ถนนสังขวิทย์ ซอย 31.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0135 ถนนสังขวิทย์ ซอย 31.jpg', 'image', NULL, 'ea63be57-2ae3-48da-9ae9-68baff9c3bc4', '2026-03-30 19:20:01.214', NULL, NULL, NULL, NULL, 997);
INSERT INTO "public"."Uploads" VALUES (1086, 'ตง.ถ.2-0135 ถนนสังขวิทย์ ซอย 32.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0135 ถนนสังขวิทย์ ซอย 32.jpg', 'image', NULL, '6010947e-71bb-432e-8215-dbfe573e8ae8', '2026-03-30 19:20:01.215', NULL, NULL, NULL, NULL, 997);
INSERT INTO "public"."Uploads" VALUES (1087, 'ตง.ถ.2-0135 ถนนสังขวิทย์ ซอย 33.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0135 ถนนสังขวิทย์ ซอย 33.jpg', 'image', NULL, 'd40b9988-8dd8-443f-aa3c-b6f6106276b1', '2026-03-30 19:20:01.216', NULL, NULL, NULL, NULL, 997);
INSERT INTO "public"."Uploads" VALUES (1088, 'ตง.ถ.2-0135 ถนนสังขวิทย์ ซอย 34.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0135 ถนนสังขวิทย์ ซอย 34.jpg', 'image', NULL, 'c7eb808a-9656-4783-b7b3-0f6107179030', '2026-03-30 19:20:01.216', NULL, NULL, NULL, NULL, 997);
INSERT INTO "public"."Uploads" VALUES (1089, 'ตง.ถ.2-0135 ถนนสังขวิทย์ ซอย 35.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0135 ถนนสังขวิทย์ ซอย 35.jpg', 'image', NULL, 'fe1fb68f-312a-473d-ab46-6c093737ecbc', '2026-03-30 19:20:01.217', NULL, NULL, NULL, NULL, 997);
INSERT INTO "public"."Uploads" VALUES (1090, 'ตง.ถ.2-0135 ถนนสังขวิทย์ ซอย 36.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0135 ถนนสังขวิทย์ ซอย 36.jpg', 'image', NULL, 'a2fbcc28-ffe7-4250-a538-a1bc3246bdc1', '2026-03-30 19:20:01.218', NULL, NULL, NULL, NULL, 997);
INSERT INTO "public"."Uploads" VALUES (1091, 'ตง.ถ.2-0135 ถนนสังขวิทย์ ซอย 37.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0135 ถนนสังขวิทย์ ซอย 37.jpg', 'image', NULL, 'c81e1bf2-7e1b-40f1-a944-709c7434d22e', '2026-03-30 19:20:01.218', NULL, NULL, NULL, NULL, 997);
INSERT INTO "public"."Uploads" VALUES (1092, 'ตง.ถ.2-0135 ถนนสังขวิทย์ ซอย 38.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0135 ถนนสังขวิทย์ ซอย 38.jpg', 'image', NULL, 'b26f982d-4ffb-45d0-8b51-78840d7aa810', '2026-03-30 19:20:01.219', NULL, NULL, NULL, NULL, 997);
INSERT INTO "public"."Uploads" VALUES (1093, 'ตง.ถ.2-0135 ถนนสังขวิทย์ ซอย 39.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0135 ถนนสังขวิทย์ ซอย 39.jpg', 'image', NULL, '3814e4e5-d998-4304-a83f-298c2f3d9052', '2026-03-30 19:20:01.219', NULL, NULL, NULL, NULL, 997);
INSERT INTO "public"."Uploads" VALUES (1094, 'ตง.ถ.2-0136 ถนนสังขวิทย์ ซอย 41.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0136 ถนนสังขวิทย์ ซอย 41.jpg', 'image', NULL, '711f0312-435e-4491-ab6a-2998a9d6ace3', '2026-03-30 19:20:01.22', NULL, NULL, NULL, NULL, 998);
INSERT INTO "public"."Uploads" VALUES (1095, 'ตง.ถ.2-0136 ถนนสังขวิทย์ ซอย 42.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0136 ถนนสังขวิทย์ ซอย 42.jpg', 'image', NULL, 'd32557bb-7915-47cf-a8aa-223cab98ee70', '2026-03-30 19:20:01.223', NULL, NULL, NULL, NULL, 998);
INSERT INTO "public"."Uploads" VALUES (1096, 'ตง.ถ.2-0136 ถนนสังขวิทย์ ซอย 43.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0136 ถนนสังขวิทย์ ซอย 43.jpg', 'image', NULL, '609bfc88-e747-473d-8e71-3c8e1a7b9f71', '2026-03-30 19:20:01.224', NULL, NULL, NULL, NULL, 998);
INSERT INTO "public"."Uploads" VALUES (1097, 'ตง.ถ.2-0136 ถนนสังขวิทย์ ซอย 44.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0136 ถนนสังขวิทย์ ซอย 44.jpg', 'image', NULL, 'd621eac6-9d8a-4cce-ac3e-e9efc5394b69', '2026-03-30 19:20:01.225', NULL, NULL, NULL, NULL, 998);
INSERT INTO "public"."Uploads" VALUES (1098, 'ตง.ถ.2-0136 ถนนสังขวิทย์ ซอย 45.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0136 ถนนสังขวิทย์ ซอย 45.jpg', 'image', NULL, 'df8cb352-c2f0-44d4-8218-708628a0bea7', '2026-03-30 19:20:01.225', NULL, NULL, NULL, NULL, 998);
INSERT INTO "public"."Uploads" VALUES (1099, 'ตง.ถ.2-0136 ถนนสังขวิทย์ ซอย 46.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0136 ถนนสังขวิทย์ ซอย 46.jpg', 'image', NULL, 'a13f60a3-e340-4819-84e3-6c237043a93c', '2026-03-30 19:20:01.225', NULL, NULL, NULL, NULL, 998);
INSERT INTO "public"."Uploads" VALUES (1100, 'ตง.ถ.2-0136 ถนนสังขวิทย์ ซอย 47.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0136 ถนนสังขวิทย์ ซอย 47.jpg', 'image', NULL, 'ff889801-c7e6-4f9f-bb94-5706b838e6c3', '2026-03-30 19:20:01.226', NULL, NULL, NULL, NULL, 998);
INSERT INTO "public"."Uploads" VALUES (1101, 'ตง.ถ.2-0136 ถนนสังขวิทย์ ซอย 48.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0136 ถนนสังขวิทย์ ซอย 48.jpg', 'image', NULL, '7beb5ac6-c061-4117-bb26-05b48445d85c', '2026-03-30 19:20:01.226', NULL, NULL, NULL, NULL, 998);
INSERT INTO "public"."Uploads" VALUES (1102, 'ตง.ถ.2-0136 ถนนสังขวิทย์ ซอย 49.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0136 ถนนสังขวิทย์ ซอย 49.jpg', 'image', NULL, '382bd9c9-a546-4b2b-ab09-1d3719a8511a', '2026-03-30 19:20:01.227', NULL, NULL, NULL, NULL, 998);
INSERT INTO "public"."Uploads" VALUES (1103, 'ตง.ถ.2-0137 ถนนท่ากลาง ซอย 21.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0137 ถนนท่ากลาง ซอย 21.jpg', 'image', NULL, 'dffbd094-ec54-47a8-b916-b0a590840431', '2026-03-30 19:20:01.227', NULL, NULL, NULL, NULL, 999);
INSERT INTO "public"."Uploads" VALUES (1104, 'ตง.ถ.2-0137 ถนนท่ากลาง ซอย 22.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0137 ถนนท่ากลาง ซอย 22.jpg', 'image', NULL, 'ae1888a5-4a0b-4e1d-b6e1-07f88f9af397', '2026-03-30 19:20:01.228', NULL, NULL, NULL, NULL, 999);
INSERT INTO "public"."Uploads" VALUES (1105, 'ตง.ถ.2-0137 ถนนท่ากลาง ซอย 23.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0137 ถนนท่ากลาง ซอย 23.jpg', 'image', NULL, 'daab1b4f-5404-4195-a599-d5e9168ff040', '2026-03-30 19:20:01.229', NULL, NULL, NULL, NULL, 999);
INSERT INTO "public"."Uploads" VALUES (1106, 'ตง.ถ.2-0138 ถนนท่ากลาง ซอย 61.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0138 ถนนท่ากลาง ซอย 61.jpg', 'image', NULL, '26e494ed-54ce-431d-911a-7a895dc8ca5e', '2026-03-30 19:20:01.229', NULL, NULL, NULL, NULL, 1000);
INSERT INTO "public"."Uploads" VALUES (1107, 'ตง.ถ.2-0138 ถนนท่ากลาง ซอย 62.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0138 ถนนท่ากลาง ซอย 62.jpg', 'image', NULL, '1a2df794-ba6a-4bfc-978c-2fa35d188848', '2026-03-30 19:20:01.23', NULL, NULL, NULL, NULL, 1000);
INSERT INTO "public"."Uploads" VALUES (1108, 'ตง.ถ.2-0138 ถนนท่ากลาง ซอย 63.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0138 ถนนท่ากลาง ซอย 63.jpg', 'image', NULL, '0ef257cd-4aff-44bb-afa8-c9191de2af39', '2026-03-30 19:20:01.231', NULL, NULL, NULL, NULL, 1000);
INSERT INTO "public"."Uploads" VALUES (1109, 'ตง.ถ.2-0139 ถนนท่ากลาง ซอย 81.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0139 ถนนท่ากลาง ซอย 81.jpg', 'image', NULL, '530442a2-58b3-41da-9b30-329f31f57a5e', '2026-03-30 19:20:01.232', NULL, NULL, NULL, NULL, 1001);
INSERT INTO "public"."Uploads" VALUES (1110, 'ตง.ถ.2-0139 ถนนท่ากลาง ซอย 82.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0139 ถนนท่ากลาง ซอย 82.jpg', 'image', NULL, '01c3743a-a051-4eb1-a270-cbf167d5b579', '2026-03-30 19:20:01.232', NULL, NULL, NULL, NULL, 1001);
INSERT INTO "public"."Uploads" VALUES (1111, 'ตง.ถ.2-0139 ถนนท่ากลาง ซอย 83.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0139 ถนนท่ากลาง ซอย 83.jpg', 'image', NULL, '5562a536-8b45-4e6b-9059-cc77e6e44709', '2026-03-30 19:20:01.233', NULL, NULL, NULL, NULL, 1001);
INSERT INTO "public"."Uploads" VALUES (1112, 'ตง.ถ.2-0140 ถนนวังตอ ซอย 11.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0140 ถนนวังตอ ซอย 11.jpg', 'image', NULL, '73e2cbc3-0957-4697-967d-cce6e3b73cc3', '2026-03-30 19:20:01.233', NULL, NULL, NULL, NULL, 1002);
INSERT INTO "public"."Uploads" VALUES (1113, 'ตง.ถ.2-0140 ถนนวังตอ ซอย 12.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0140 ถนนวังตอ ซอย 12.jpg', 'image', NULL, 'ea95cbf6-81aa-431e-8422-be0e94cfb1d6', '2026-03-30 19:20:01.233', NULL, NULL, NULL, NULL, 1002);
INSERT INTO "public"."Uploads" VALUES (1114, 'ตง.ถ.2-0140 ถนนวังตอ ซอย 13.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0140 ถนนวังตอ ซอย 13.jpg', 'image', NULL, 'a1e5c1a1-584e-440a-9b33-28631a4047dd', '2026-03-30 19:20:01.234', NULL, NULL, NULL, NULL, 1002);
INSERT INTO "public"."Uploads" VALUES (1118, 'ตง.ถ.2-0142 ถนนวังตอ ซอย 21.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0142 ถนนวังตอ ซอย 21.jpg', 'image', NULL, 'a932f903-c91f-4ae9-94c4-4dca43b9499c', '2026-03-30 19:20:01.237', NULL, NULL, NULL, NULL, 1003);
INSERT INTO "public"."Uploads" VALUES (1119, 'ตง.ถ.2-0142 ถนนวังตอ ซอย 22.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0142 ถนนวังตอ ซอย 22.jpg', 'image', NULL, '4ce0c849-78bc-4c30-9267-2535c3406975', '2026-03-30 19:20:01.238', NULL, NULL, NULL, NULL, 1003);
INSERT INTO "public"."Uploads" VALUES (1120, 'ตง.ถ.2-0142 ถนนวังตอ ซอย 23.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0142 ถนนวังตอ ซอย 23.jpg', 'image', NULL, '4d342ad2-3bce-4dcd-846e-87e6f941ad7e', '2026-03-30 19:20:01.238', NULL, NULL, NULL, NULL, 1003);
INSERT INTO "public"."Uploads" VALUES (1123, 'ตง.ถ.2-0143 ถนนวังตอ ซอย 2-23.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0143 ถนนวังตอ ซอย 2-23.jpg', 'image', NULL, '953af4d1-8204-4ad5-94d4-adb8a3e85ccc', '2026-03-30 19:20:01.24', NULL, NULL, NULL, NULL, 1004);
INSERT INTO "public"."Uploads" VALUES (1121, 'ตง.ถ.2-0143 ถนนวังตอ ซอย 2-21.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0143 ถนนวังตอ ซอย 2-21.jpg', 'image', NULL, 'f351ec51-319c-496b-9af8-b9aa698a454d', '2026-03-30 19:20:01.239', NULL, NULL, NULL, NULL, 1004);
INSERT INTO "public"."Uploads" VALUES (1122, 'ตง.ถ.2-0143 ถนนวังตอ ซอย 2-22.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0143 ถนนวังตอ ซอย 2-22.jpg', 'image', NULL, '36ee1cdf-709d-4998-b7f8-9f3df1dd76f1', '2026-03-30 19:20:01.239', NULL, NULL, NULL, NULL, 1004);
INSERT INTO "public"."Uploads" VALUES (1127, 'ตง.ถ.2-0145 ถนนวังตอ ซอย 41.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0145 ถนนวังตอ ซอย 41.jpg', 'image', NULL, '6c84789f-14cc-428e-a54a-d153458410e9', '2026-03-30 19:20:01.242', NULL, NULL, NULL, NULL, 1006);
INSERT INTO "public"."Uploads" VALUES (1128, 'ตง.ถ.2-0145 ถนนวังตอ ซอย 42.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0145 ถนนวังตอ ซอย 42.jpg', 'image', NULL, 'de71b489-1f82-4ef0-a736-38faae6780a5', '2026-03-30 19:20:01.243', NULL, NULL, NULL, NULL, 1006);
INSERT INTO "public"."Uploads" VALUES (1129, 'ตง.ถ.2-0145 ถนนวังตอ ซอย 43.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0145 ถนนวังตอ ซอย 43.jpg', 'image', NULL, '22145c73-8431-47a1-971c-f22953c98373', '2026-03-30 19:20:01.243', NULL, NULL, NULL, NULL, 1006);
INSERT INTO "public"."Uploads" VALUES (1133, 'ตง.ถ.2-0147 ถนนรัษฎา ซอย 11.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0147 ถนนรัษฎา ซอย 11.jpg', 'image', NULL, '196e4e09-caf6-4dba-8d00-8beff7aebf1b', '2026-03-30 19:20:01.245', NULL, NULL, NULL, NULL, 1008);
INSERT INTO "public"."Uploads" VALUES (1134, 'ตง.ถ.2-0147 ถนนรัษฎา ซอย 12.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0147 ถนนรัษฎา ซอย 12.jpg', 'image', NULL, '1d2a5686-8f75-4d2d-b5f8-3d828b992ee1', '2026-03-30 19:20:01.246', NULL, NULL, NULL, NULL, 1008);
INSERT INTO "public"."Uploads" VALUES (1135, 'ตง.ถ.2-0147 ถนนรัษฎา ซอย 13.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0147 ถนนรัษฎา ซอย 13.jpg', 'image', NULL, 'fedf2a9d-028d-4264-95f7-67b6502f9f0b', '2026-03-30 19:20:01.246', NULL, NULL, NULL, NULL, 1008);
INSERT INTO "public"."Uploads" VALUES (1136, 'ตง.ถ.2-0148 ถนนรัษฎา ซอย 21.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0148 ถนนรัษฎา ซอย 21.jpg', 'image', NULL, 'ab37fdb1-3279-474f-84a5-2b52abe6af86', '2026-03-30 19:20:01.247', NULL, NULL, NULL, NULL, 1009);
INSERT INTO "public"."Uploads" VALUES (1137, 'ตง.ถ.2-0148 ถนนรัษฎา ซอย 22.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0148 ถนนรัษฎา ซอย 22.jpg', 'image', NULL, 'e2b295f2-693e-450d-82c5-dc8b4b8d1fad', '2026-03-30 19:20:01.247', NULL, NULL, NULL, NULL, 1009);
INSERT INTO "public"."Uploads" VALUES (1138, 'ตง.ถ.2-0148 ถนนรัษฎา ซอย 23.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0148 ถนนรัษฎา ซอย 23.jpg', 'image', NULL, '0560dc8d-497f-4f97-850b-2a60bb0f2836', '2026-03-30 19:20:01.248', NULL, NULL, NULL, NULL, 1009);
INSERT INTO "public"."Uploads" VALUES (1142, 'ตง.ถ.2-0150 ถนนรัษฎา ซอย 41.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0150 ถนนรัษฎา ซอย 41.jpg', 'image', NULL, '9fbb4848-42b7-4829-8227-42c54a1a13ee', '2026-03-30 19:20:01.251', NULL, NULL, NULL, NULL, 1010);
INSERT INTO "public"."Uploads" VALUES (1143, 'ตง.ถ.2-0150 ถนนรัษฎา ซอย 42.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0150 ถนนรัษฎา ซอย 42.jpg', 'image', NULL, 'dfffdf27-3e0a-4d1e-a9ec-079cb48db773', '2026-03-30 19:20:01.252', NULL, NULL, NULL, NULL, 1010);
INSERT INTO "public"."Uploads" VALUES (1144, 'ตง.ถ.2-0150 ถนนรัษฎา ซอย 43.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0150 ถนนรัษฎา ซอย 43.jpg', 'image', NULL, '19628a5f-f344-4b24-ad4d-514b14fdf559', '2026-03-30 19:20:01.252', NULL, NULL, NULL, NULL, 1010);
INSERT INTO "public"."Uploads" VALUES (1145, 'ตง.ถ.2-0151 ถนนรัษฎา ซอย 51.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0151 ถนนรัษฎา ซอย 51.jpg', 'image', NULL, 'c1c926db-bd42-44e9-be26-b0237ad1cca4', '2026-03-30 19:20:01.253', NULL, NULL, NULL, NULL, 1011);
INSERT INTO "public"."Uploads" VALUES (1146, 'ตง.ถ.2-0151 ถนนรัษฎา ซอย 52.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0151 ถนนรัษฎา ซอย 52.jpg', 'image', NULL, '8b500291-7c07-4dc4-8c93-2060978f083f', '2026-03-30 19:20:01.253', NULL, NULL, NULL, NULL, 1011);
INSERT INTO "public"."Uploads" VALUES (1147, 'ตง.ถ.2-0151 ถนนรัษฎา ซอย 53.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0151 ถนนรัษฎา ซอย 53.jpg', 'image', NULL, '32f347f4-63d5-4aff-a525-4b9147f1dda8', '2026-03-30 19:20:01.254', NULL, NULL, NULL, NULL, 1011);
INSERT INTO "public"."Uploads" VALUES (1148, 'ตง.ถ.2-0152 ถนนรัษฎา ซอย 61.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0152 ถนนรัษฎา ซอย 61.jpg', 'image', NULL, 'd177d52c-55fb-4da4-ae80-e77d8f19b829', '2026-03-30 19:20:01.254', NULL, NULL, NULL, NULL, 1012);
INSERT INTO "public"."Uploads" VALUES (1149, 'ตง.ถ.2-0152 ถนนรัษฎา ซอย 62.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0152 ถนนรัษฎา ซอย 62.jpg', 'image', NULL, 'e5c35efc-e3f9-4b84-ab15-083f91d9e9a9', '2026-03-30 19:20:01.255', NULL, NULL, NULL, NULL, 1012);
INSERT INTO "public"."Uploads" VALUES (1150, 'ตง.ถ.2-0152 ถนนรัษฎา ซอย 63.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0152 ถนนรัษฎา ซอย 63.jpg', 'image', NULL, '0d95f295-1b81-4a73-874f-858ac86d7674', '2026-03-30 19:20:01.255', NULL, NULL, NULL, NULL, 1012);
INSERT INTO "public"."Uploads" VALUES (600, 'ตง.ถ.2-0080 ถนนห้วยยอด ซอย 261.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0080 ถนนห้วยยอด ซอย 261.jpg', 'image', NULL, '7d042c50-b829-4a6e-a8b0-c4950c7652bb', '2026-03-30 19:20:00.899', NULL, NULL, NULL, NULL, 944);
INSERT INTO "public"."Uploads" VALUES (601, 'ตง.ถ.2-0080 ถนนห้วยยอด ซอย 262.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0080 ถนนห้วยยอด ซอย 262.jpg', 'image', NULL, '1955e578-1cf8-422f-9329-f0c5cb62d1ce', '2026-03-30 19:20:00.9', NULL, NULL, NULL, NULL, 944);
INSERT INTO "public"."Uploads" VALUES (602, 'ตง.ถ.2-0080 ถนนห้วยยอด ซอย 263.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0080 ถนนห้วยยอด ซอย 263.jpg', 'image', NULL, '795e7fba-d11c-45c7-a1a4-37c49c860c7f', '2026-03-30 19:20:00.9', NULL, NULL, NULL, NULL, 944);
INSERT INTO "public"."Uploads" VALUES (603, 'ตง.ถ.2-0080 ถนนห้วยยอด ซอย 264.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0080 ถนนห้วยยอด ซอย 264.jpg', 'image', NULL, '5682ae82-ba24-4ef4-a12b-415ba8cdb73b', '2026-03-30 19:20:00.901', NULL, NULL, NULL, NULL, 944);
INSERT INTO "public"."Uploads" VALUES (604, 'ตง.ถ.2-0080 ถนนห้วยยอด ซอย 265.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0080 ถนนห้วยยอด ซอย 265.jpg', 'image', NULL, '6869f9be-c533-4bfa-a46b-501ff565778c', '2026-03-30 19:20:00.901', NULL, NULL, NULL, NULL, 944);
INSERT INTO "public"."Uploads" VALUES (605, 'ตง.ถ.2-0080 ถนนห้วยยอด ซอย 266.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0080 ถนนห้วยยอด ซอย 266.jpg', 'image', NULL, '209664d5-7265-4623-9e74-a4ab38003709', '2026-03-30 19:20:00.902', NULL, NULL, NULL, NULL, 944);
INSERT INTO "public"."Uploads" VALUES (606, 'ตง.ถ.2-0080 ถนนห้วยยอด ซอย 267.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0080 ถนนห้วยยอด ซอย 267.jpg', 'image', NULL, '0bf12dfe-5140-421c-af0a-dfbf44a2f8a3', '2026-03-30 19:20:00.903', NULL, NULL, NULL, NULL, 944);
INSERT INTO "public"."Uploads" VALUES (362, 'ตง.ถ.2-0046 ถนนกันตังซอย 92.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0046 ถนนกันตังซอย 92.jpg', 'image', NULL, 'b6705d15-28f6-4e64-bbfe-eeb2672a2f25', '2026-03-30 19:20:00.752', NULL, NULL, NULL, NULL, 910);
INSERT INTO "public"."Uploads" VALUES (363, 'ตง.ถ.2-0046 ถนนกันตังซอย 93.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0046 ถนนกันตังซอย 93.jpg', 'image', NULL, '2c15cecd-8c2c-42db-ba57-df36f04a5912', '2026-03-30 19:20:00.753', NULL, NULL, NULL, NULL, 910);
INSERT INTO "public"."Uploads" VALUES (364, 'ตง.ถ.2-0046 ถนนกันตังซอย 94.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0046 ถนนกันตังซอย 94.jpg', 'image', NULL, '44be2546-88b4-49d8-81f8-9566023a2b34', '2026-03-30 19:20:00.753', NULL, NULL, NULL, NULL, 910);
INSERT INTO "public"."Uploads" VALUES (365, 'ตง.ถ.2-0046 ถนนกันตังซอย 95.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0046 ถนนกันตังซอย 95.jpg', 'image', NULL, '8129ef37-e1e2-4f88-89e0-79dbab9120d5', '2026-03-30 19:20:00.754', NULL, NULL, NULL, NULL, 910);
INSERT INTO "public"."Uploads" VALUES (366, 'ตง.ถ.2-0046 ถนนกันตังซอย 96.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0046 ถนนกันตังซอย 96.jpg', 'image', NULL, '7b8059ee-db35-451a-8afa-5f5abae619f2', '2026-03-30 19:20:00.755', NULL, NULL, NULL, NULL, 910);
INSERT INTO "public"."Uploads" VALUES (367, 'ตง.ถ.2-0046 ถนนกันตังซอย 97.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0046 ถนนกันตังซอย 97.jpg', 'image', NULL, '6d2f29ad-c404-4dca-a293-67e9cf925400', '2026-03-30 19:20:00.755', NULL, NULL, NULL, NULL, 910);
INSERT INTO "public"."Uploads" VALUES (368, 'ตง.ถ.2-0047ถนนกันตังซอย 10 (สุสาน)1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0047ถนนกันตังซอย 10 (สุสาน)1.jpg', 'image', NULL, '8b50f895-8884-44bc-b765-384afa26b753', '2026-03-30 19:20:00.756', NULL, NULL, NULL, NULL, 911);
INSERT INTO "public"."Uploads" VALUES (369, 'ตง.ถ.2-0047ถนนกันตังซอย 10 (สุสาน)2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0047ถนนกันตังซอย 10 (สุสาน)2.jpg', 'image', NULL, 'b03f0626-4788-4381-861a-3c6aad1abdb6', '2026-03-30 19:20:00.757', NULL, NULL, NULL, NULL, 911);
INSERT INTO "public"."Uploads" VALUES (370, 'ตง.ถ.2-0047ถนนกันตังซอย 10 (สุสาน)3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0047ถนนกันตังซอย 10 (สุสาน)3.jpg', 'image', NULL, '5d058278-7de2-47e6-91d6-320aa0e5db21', '2026-03-30 19:20:00.758', NULL, NULL, NULL, NULL, 911);
INSERT INTO "public"."Uploads" VALUES (371, 'ตง.ถ.2-0047ถนนกันตังซอย 10 (สุสาน)4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0047ถนนกันตังซอย 10 (สุสาน)4.jpg', 'image', NULL, 'c2fb35a4-8a50-4b64-9015-3b5845ad28b4', '2026-03-30 19:20:00.758', NULL, NULL, NULL, NULL, 911);
INSERT INTO "public"."Uploads" VALUES (372, 'ตง.ถ.2-0047ถนนกันตังซอย 10 (สุสาน)5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0047ถนนกันตังซอย 10 (สุสาน)5.jpg', 'image', NULL, '886fac1d-a29a-447e-b42c-a4025f438537', '2026-03-30 19:20:00.759', NULL, NULL, NULL, NULL, 911);
INSERT INTO "public"."Uploads" VALUES (373, 'ตง.ถ.2-0047ถนนกันตังซอย 10 (สุสาน)6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0047ถนนกันตังซอย 10 (สุสาน)6.jpg', 'image', NULL, 'ce8dde21-8897-4c13-8ce4-629896784e70', '2026-03-30 19:20:00.76', NULL, NULL, NULL, NULL, 911);
INSERT INTO "public"."Uploads" VALUES (374, 'ตง.ถ.2-0047ถนนกันตังซอย 10 (สุสาน)7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0047ถนนกันตังซอย 10 (สุสาน)7.jpg', 'image', NULL, 'c150c74a-c220-42a6-a0ca-bc18bb213ec4', '2026-03-30 19:20:00.76', NULL, NULL, NULL, NULL, 911);
INSERT INTO "public"."Uploads" VALUES (375, 'ตง.ถ.2-0048 ถนนกันตังซอย 111.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0048 ถนนกันตังซอย 111.jpg', 'image', NULL, 'a860e97b-e2ad-4d34-8616-567a1226a0da', '2026-03-30 19:20:00.76', NULL, NULL, NULL, NULL, 912);
INSERT INTO "public"."Uploads" VALUES (424, 'ตง.ถ.2-0055 ถนนกันตังซอย 201.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0055 ถนนกันตังซอย 201.jpg', 'image', NULL, 'f73343bd-7243-4fd0-8d6f-56ab4cf98bce', '2026-03-30 19:20:00.789', NULL, NULL, NULL, NULL, 919);
INSERT INTO "public"."Uploads" VALUES (425, 'ตง.ถ.2-0055 ถนนกันตังซอย 202.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0055 ถนนกันตังซอย 202.jpg', 'image', NULL, 'a07a1ce6-09a5-4f91-b4e6-7d314dae8ee4', '2026-03-30 19:20:00.789', NULL, NULL, NULL, NULL, 919);
INSERT INTO "public"."Uploads" VALUES (426, 'ตง.ถ.2-0055 ถนนกันตังซอย 203.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0055 ถนนกันตังซอย 203.jpg', 'image', NULL, 'ccb6d06b-3fe3-4612-82f5-fdc58b05a8ce', '2026-03-30 19:20:00.789', NULL, NULL, NULL, NULL, 919);
INSERT INTO "public"."Uploads" VALUES (427, 'ตง.ถ.2-0055 ถนนกันตังซอย 204.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0055 ถนนกันตังซอย 204.jpg', 'image', NULL, 'e89c53ff-5b66-4c91-9b21-018998ab2ea3', '2026-03-30 19:20:00.79', NULL, NULL, NULL, NULL, 919);
INSERT INTO "public"."Uploads" VALUES (428, 'ตง.ถ.2-0055 ถนนกันตังซอย 205.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0055 ถนนกันตังซอย 205.jpg', 'image', NULL, '3f913ddc-1348-49f6-979f-1e09ccdfe32b', '2026-03-30 19:20:00.791', NULL, NULL, NULL, NULL, 919);
INSERT INTO "public"."Uploads" VALUES (429, 'ตง.ถ.2-0055 ถนนกันตังซอย 206.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0055 ถนนกันตังซอย 206.jpg', 'image', NULL, '063877ed-bf43-46a1-b898-12c5a240802b', '2026-03-30 19:20:00.791', NULL, NULL, NULL, NULL, 919);
INSERT INTO "public"."Uploads" VALUES (430, 'ตง.ถ.2-0055 ถนนกันตังซอย 207.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0055 ถนนกันตังซอย 207.jpg', 'image', NULL, '8db721a3-b79f-4147-98d6-dd5a8f22f6f1', '2026-03-30 19:20:00.792', NULL, NULL, NULL, NULL, 919);
INSERT INTO "public"."Uploads" VALUES (71, 'ตง.ถ.2-0001 ถนนราชดำเนิน1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0001 ถนนราชดำเนิน1.jpg', 'image', NULL, 'e665f0d3-9d4b-4eeb-aa9e-2c7982e39742', '2026-03-30 19:20:00.572', NULL, NULL, NULL, NULL, 868);
INSERT INTO "public"."Uploads" VALUES (72, 'ตง.ถ.2-0001 ถนนราชดำเนิน2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0001 ถนนราชดำเนิน2.jpg', 'image', NULL, '46798726-8c45-44ea-b624-ecdbbc9c8f27', '2026-03-30 19:20:00.577', NULL, NULL, NULL, NULL, 868);
INSERT INTO "public"."Uploads" VALUES (73, 'ตง.ถ.2-0001 ถนนราชดำเนิน3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0001 ถนนราชดำเนิน3.jpg', 'image', NULL, '58c1547c-948a-430f-abbe-69b6cb224594', '2026-03-30 19:20:00.578', NULL, NULL, NULL, NULL, 868);
INSERT INTO "public"."Uploads" VALUES (74, 'ตง.ถ.2-0001 ถนนราชดำเนิน4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0001 ถนนราชดำเนิน4.jpg', 'image', NULL, '93ffee1d-70d6-4237-85a1-22d34f1483ce', '2026-03-30 19:20:00.58', NULL, NULL, NULL, NULL, 868);
INSERT INTO "public"."Uploads" VALUES (75, 'ตง.ถ.2-0001 ถนนราชดำเนิน5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0001 ถนนราชดำเนิน5.jpg', 'image', NULL, '7a992ddf-3dd5-43ee-808d-2449df836627', '2026-03-30 19:20:00.581', NULL, NULL, NULL, NULL, 868);
INSERT INTO "public"."Uploads" VALUES (76, 'ตง.ถ.2-0001 ถนนราชดำเนิน6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0001 ถนนราชดำเนิน6.jpg', 'image', NULL, '383b2e2d-aa1e-48ce-b1be-05a97e136466', '2026-03-30 19:20:00.581', NULL, NULL, NULL, NULL, 868);
INSERT INTO "public"."Uploads" VALUES (77, 'ตง.ถ.2-0001 ถนนราชดำเนิน7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0001 ถนนราชดำเนิน7.jpg', 'image', NULL, 'd09bb2c7-073d-42f0-8b2a-40cb37d91da1', '2026-03-30 19:20:00.582', NULL, NULL, NULL, NULL, 868);
INSERT INTO "public"."Uploads" VALUES (78, 'ตง.ถ.2-0002 ถนนพระราม 61.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0002 ถนนพระราม 61.jpg', 'image', NULL, '79e0d954-1e38-47be-be8b-854f86b6acc8', '2026-03-30 19:20:00.583', NULL, NULL, NULL, NULL, 872);
INSERT INTO "public"."Uploads" VALUES (79, 'ตง.ถ.2-0002 ถนนพระราม 62.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0002 ถนนพระราม 62.jpg', 'image', NULL, '82ce6cef-3d53-4802-ac5c-06aff5c8d1c6', '2026-03-30 19:20:00.584', NULL, NULL, NULL, NULL, 872);
INSERT INTO "public"."Uploads" VALUES (80, 'ตง.ถ.2-0002 ถนนพระราม 63.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0002 ถนนพระราม 63.jpg', 'image', NULL, 'eb348e4f-7f8e-4abc-a081-e45ee989a126', '2026-03-30 19:20:00.586', NULL, NULL, NULL, NULL, 872);
INSERT INTO "public"."Uploads" VALUES (81, 'ตง.ถ.2-0002 ถนนพระราม 64.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0002 ถนนพระราม 64.jpg', 'image', NULL, '875e6269-c02a-4249-969b-cba2f7a86860', '2026-03-30 19:20:00.587', NULL, NULL, NULL, NULL, 872);
INSERT INTO "public"."Uploads" VALUES (82, 'ตง.ถ.2-0002 ถนนพระราม 65.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0002 ถนนพระราม 65.jpg', 'image', NULL, 'c32e0850-15e0-4dae-82ef-2f7160aae67e', '2026-03-30 19:20:00.588', NULL, NULL, NULL, NULL, 872);
INSERT INTO "public"."Uploads" VALUES (83, 'ตง.ถ.2-0002 ถนนพระราม 66.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0002 ถนนพระราม 66.jpg', 'image', NULL, '6603f048-b040-44b4-8d63-77c3f4d0755c', '2026-03-30 19:20:00.589', NULL, NULL, NULL, NULL, 872);
INSERT INTO "public"."Uploads" VALUES (84, 'ตง.ถ.2-0002 ถนนพระราม 67.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0002 ถนนพระราม 67.jpg', 'image', NULL, '893517c0-7b67-4e15-a809-b2e07d4f741a', '2026-03-30 19:20:00.59', NULL, NULL, NULL, NULL, 872);
INSERT INTO "public"."Uploads" VALUES (85, 'ตง.ถ.2-0003 ถนนวิเศษกุล1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0003 ถนนวิเศษกุล1.jpg', 'image', NULL, 'a1ab1be5-c6e8-4af4-bd2b-da0cc03ad36f', '2026-03-30 19:20:00.591', NULL, NULL, NULL, NULL, 873);
INSERT INTO "public"."Uploads" VALUES (86, 'ตง.ถ.2-0003 ถนนวิเศษกุล2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0003 ถนนวิเศษกุล2.jpg', 'image', NULL, '5c97925f-87f0-4222-91ae-46fa5427738f', '2026-03-30 19:20:00.591', NULL, NULL, NULL, NULL, 873);
INSERT INTO "public"."Uploads" VALUES (87, 'ตง.ถ.2-0003 ถนนวิเศษกุล3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0003 ถนนวิเศษกุล3.jpg', 'image', NULL, '4080d750-3245-4db1-af28-67bab9e678bb', '2026-03-30 19:20:00.591', NULL, NULL, NULL, NULL, 873);
INSERT INTO "public"."Uploads" VALUES (88, 'ตง.ถ.2-0003 ถนนวิเศษกุล4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0003 ถนนวิเศษกุล4.jpg', 'image', NULL, '60f2c63f-c619-481a-aa0a-06a6581b8846', '2026-03-30 19:20:00.592', NULL, NULL, NULL, NULL, 873);
INSERT INTO "public"."Uploads" VALUES (89, 'ตง.ถ.2-0003 ถนนวิเศษกุล5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0003 ถนนวิเศษกุล5.jpg', 'image', NULL, '04158285-6c7f-4063-949f-1f53da48e418', '2026-03-30 19:20:00.593', NULL, NULL, NULL, NULL, 873);
INSERT INTO "public"."Uploads" VALUES (90, 'ตง.ถ.2-0003 ถนนวิเศษกุล6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0003 ถนนวิเศษกุล6.jpg', 'image', NULL, '4a97f292-7cfd-4bb3-8066-f63ab4a93ef5', '2026-03-30 19:20:00.593', NULL, NULL, NULL, NULL, 873);
INSERT INTO "public"."Uploads" VALUES (91, 'ตง.ถ.2-0003 ถนนวิเศษกุล7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0003 ถนนวิเศษกุล7.jpg', 'image', NULL, '691e2f1c-780c-4083-8811-ce28125895b5', '2026-03-30 19:20:00.594', NULL, NULL, NULL, NULL, 873);
INSERT INTO "public"."Uploads" VALUES (92, 'ตง.ถ.2-0004 ถนนกันตัง1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0004 ถนนกันตัง1.jpg', 'image', NULL, 'b4ca77fe-d6af-4002-a5f3-538cbbe33ff8', '2026-03-30 19:20:00.594', NULL, NULL, NULL, NULL, 874);
INSERT INTO "public"."Uploads" VALUES (93, 'ตง.ถ.2-0004 ถนนกันตัง2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0004 ถนนกันตัง2.jpg', 'image', NULL, 'c50bf621-8cc0-4bd1-bd06-8d019c38a907', '2026-03-30 19:20:00.594', NULL, NULL, NULL, NULL, 874);
INSERT INTO "public"."Uploads" VALUES (94, 'ตง.ถ.2-0004 ถนนกันตัง3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0004 ถนนกันตัง3.jpg', 'image', NULL, '4353678c-f792-46dd-aef4-9ea163aadec0', '2026-03-30 19:20:00.595', NULL, NULL, NULL, NULL, 874);
INSERT INTO "public"."Uploads" VALUES (95, 'ตง.ถ.2-0004 ถนนกันตัง4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0004 ถนนกันตัง4.jpg', 'image', NULL, 'abf795b8-459f-4fe0-a740-407980728750', '2026-03-30 19:20:00.596', NULL, NULL, NULL, NULL, 874);
INSERT INTO "public"."Uploads" VALUES (96, 'ตง.ถ.2-0004 ถนนกันตัง5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0004 ถนนกันตัง5.jpg', 'image', NULL, '5244b6e4-cf24-4ad0-976f-54858266529b', '2026-03-30 19:20:00.597', NULL, NULL, NULL, NULL, 874);
INSERT INTO "public"."Uploads" VALUES (97, 'ตง.ถ.2-0004 ถนนกันตัง6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0004 ถนนกันตัง6.jpg', 'image', NULL, '08866077-cfa1-43e7-804a-87a08724034a', '2026-03-30 19:20:00.598', NULL, NULL, NULL, NULL, 874);
INSERT INTO "public"."Uploads" VALUES (98, 'ตง.ถ.2-0004 ถนนกันตัง7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0004 ถนนกันตัง7.jpg', 'image', NULL, 'd222b871-ef5c-46e9-8249-3479b42aa9eb', '2026-03-30 19:20:00.598', NULL, NULL, NULL, NULL, 874);
INSERT INTO "public"."Uploads" VALUES (99, 'ตง.ถ.2-0005 ถนนห้วยยอด1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0005 ถนนห้วยยอด1.jpg', 'image', NULL, 'f6a1e21b-6328-42fc-921d-fd47f7240506', '2026-03-30 19:20:00.599', NULL, NULL, NULL, NULL, 875);
INSERT INTO "public"."Uploads" VALUES (100, 'ตง.ถ.2-0005 ถนนห้วยยอด2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0005 ถนนห้วยยอด2.jpg', 'image', NULL, 'a920e693-9d87-41c0-9015-7cda5193e1f8', '2026-03-30 19:20:00.599', NULL, NULL, NULL, NULL, 875);
INSERT INTO "public"."Uploads" VALUES (101, 'ตง.ถ.2-0005 ถนนห้วยยอด3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0005 ถนนห้วยยอด3.jpg', 'image', NULL, '81dde973-9a87-4205-9894-4ae0c0bfdc46', '2026-03-30 19:20:00.599', NULL, NULL, NULL, NULL, 875);
INSERT INTO "public"."Uploads" VALUES (102, 'ตง.ถ.2-0005 ถนนห้วยยอด4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0005 ถนนห้วยยอด4.jpg', 'image', NULL, '5ac5ae94-8464-4382-a780-fdcefbffbf4a', '2026-03-30 19:20:00.6', NULL, NULL, NULL, NULL, 875);
INSERT INTO "public"."Uploads" VALUES (103, 'ตง.ถ.2-0005 ถนนห้วยยอด5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0005 ถนนห้วยยอด5.jpg', 'image', NULL, 'fc322e7b-48bb-4856-9ce4-d28f62182c96', '2026-03-30 19:20:00.6', NULL, NULL, NULL, NULL, 875);
INSERT INTO "public"."Uploads" VALUES (104, 'ตง.ถ.2-0005 ถนนห้วยยอด6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0005 ถนนห้วยยอด6.jpg', 'image', NULL, '182080d4-abb8-4e52-b74f-4150cb7b7e66', '2026-03-30 19:20:00.6', NULL, NULL, NULL, NULL, 875);
INSERT INTO "public"."Uploads" VALUES (105, 'ตง.ถ.2-0005 ถนนห้วยยอด7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0005 ถนนห้วยยอด7.jpg', 'image', NULL, '9a47b696-16ea-4a7b-bef3-6ab2716b4a4a', '2026-03-30 19:20:00.601', NULL, NULL, NULL, NULL, 875);
INSERT INTO "public"."Uploads" VALUES (106, 'ตง.ถ.2-0006 ถนนพัทลุง(ตอนที่ 1)1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0006 ถนนพัทลุง(ตอนที่ 1)1.jpg', 'image', NULL, '0231ba43-729b-4a24-9c6d-de320bac33e3', '2026-03-30 19:20:00.601', NULL, NULL, NULL, NULL, 876);
INSERT INTO "public"."Uploads" VALUES (107, 'ตง.ถ.2-0006 ถนนพัทลุง(ตอนที่ 1)2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0006 ถนนพัทลุง(ตอนที่ 1)2.jpg', 'image', NULL, '8f3c4d6a-d9a6-49c2-97cb-7616151e3f81', '2026-03-30 19:20:00.602', NULL, NULL, NULL, NULL, 876);
INSERT INTO "public"."Uploads" VALUES (108, 'ตง.ถ.2-0006 ถนนพัทลุง(ตอนที่ 1)3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0006 ถนนพัทลุง(ตอนที่ 1)3.jpg', 'image', NULL, '2bf9c00a-87b9-4d32-b195-310a07a7ba7c', '2026-03-30 19:20:00.602', NULL, NULL, NULL, NULL, 876);
INSERT INTO "public"."Uploads" VALUES (109, 'ตง.ถ.2-0006 ถนนพัทลุง(ตอนที่ 1)4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0006 ถนนพัทลุง(ตอนที่ 1)4.jpg', 'image', NULL, '2ac46c9c-ac35-404b-bd28-5972c983e671', '2026-03-30 19:20:00.603', NULL, NULL, NULL, NULL, 876);
INSERT INTO "public"."Uploads" VALUES (110, 'ตง.ถ.2-0006 ถนนพัทลุง(ตอนที่ 1)5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0006 ถนนพัทลุง(ตอนที่ 1)5.jpg', 'image', NULL, 'd0c8b4df-8545-42e1-bca6-d5243a48b561', '2026-03-30 19:20:00.603', NULL, NULL, NULL, NULL, 876);
INSERT INTO "public"."Uploads" VALUES (111, 'ตง.ถ.2-0006 ถนนพัทลุง(ตอนที่ 1)6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0006 ถนนพัทลุง(ตอนที่ 1)6.jpg', 'image', NULL, 'ec35ffc5-4f1b-4dcc-bb8c-f0b01d7e6670', '2026-03-30 19:20:00.604', NULL, NULL, NULL, NULL, 876);
INSERT INTO "public"."Uploads" VALUES (112, 'ตง.ถ.2-0006 ถนนพัทลุง(ตอนที่ 1)7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0006 ถนนพัทลุง(ตอนที่ 1)7.jpg', 'image', NULL, 'b43c7a72-a960-4ac3-b299-b5f9b9eca260', '2026-03-30 19:20:00.604', NULL, NULL, NULL, NULL, 876);
INSERT INTO "public"."Uploads" VALUES (113, 'ตง.ถ.2-0007 ถนนพัทลุง(ตอนที่ 2)1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0007 ถนนพัทลุง(ตอนที่ 2)1.jpg', 'image', NULL, '007d444c-2ef3-4044-8b8a-643a0426e37c', '2026-03-30 19:20:00.604', NULL, NULL, NULL, NULL, 877);
INSERT INTO "public"."Uploads" VALUES (114, 'ตง.ถ.2-0007 ถนนพัทลุง(ตอนที่ 2)2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0007 ถนนพัทลุง(ตอนที่ 2)2.jpg', 'image', NULL, 'a0ab1ea2-5bdf-4353-8d37-f1e0a441f93f', '2026-03-30 19:20:00.605', NULL, NULL, NULL, NULL, 877);
INSERT INTO "public"."Uploads" VALUES (115, 'ตง.ถ.2-0007 ถนนพัทลุง(ตอนที่ 2)3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0007 ถนนพัทลุง(ตอนที่ 2)3.jpg', 'image', NULL, 'ad396c6a-ad1e-4968-99b3-6f9a5eed32c1', '2026-03-30 19:20:00.605', NULL, NULL, NULL, NULL, 877);
INSERT INTO "public"."Uploads" VALUES (116, 'ตง.ถ.2-0007 ถนนพัทลุง(ตอนที่ 2)4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0007 ถนนพัทลุง(ตอนที่ 2)4.jpg', 'image', NULL, 'ff90490f-f039-4788-b1a6-1fc590d3656a', '2026-03-30 19:20:00.605', NULL, NULL, NULL, NULL, 877);
INSERT INTO "public"."Uploads" VALUES (117, 'ตง.ถ.2-0007 ถนนพัทลุง(ตอนที่ 2)5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0007 ถนนพัทลุง(ตอนที่ 2)5.jpg', 'image', NULL, '35774699-e8a5-46f8-8d6c-d1b56cce380f', '2026-03-30 19:20:00.606', NULL, NULL, NULL, NULL, 877);
INSERT INTO "public"."Uploads" VALUES (118, 'ตง.ถ.2-0007 ถนนพัทลุง(ตอนที่ 2)6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0007 ถนนพัทลุง(ตอนที่ 2)6.jpg', 'image', NULL, 'b4598fe4-665f-4568-a557-2761b1f5cd4d', '2026-03-30 19:20:00.606', NULL, NULL, NULL, NULL, 877);
INSERT INTO "public"."Uploads" VALUES (119, 'ตง.ถ.2-0007 ถนนพัทลุง(ตอนที่ 2)7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0007 ถนนพัทลุง(ตอนที่ 2)7.jpg', 'image', NULL, '66ec65ab-9ede-420f-b4d8-5b1f5fcc1e93', '2026-03-30 19:20:00.607', NULL, NULL, NULL, NULL, 877);
INSERT INTO "public"."Uploads" VALUES (120, 'ตง.ถ.2-0008 ถนนรัษฎา1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0008 ถนนรัษฎา1.jpg', 'image', NULL, '679a69b4-e7b4-4932-94bd-879024d13d6d', '2026-03-30 19:20:00.607', NULL, NULL, NULL, NULL, 878);
INSERT INTO "public"."Uploads" VALUES (121, 'ตง.ถ.2-0008 ถนนรัษฎา2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0008 ถนนรัษฎา2.jpg', 'image', NULL, '8fa6c560-8daf-406e-a9f5-db6a6de62e42', '2026-03-30 19:20:00.608', NULL, NULL, NULL, NULL, 878);
INSERT INTO "public"."Uploads" VALUES (122, 'ตง.ถ.2-0008 ถนนรัษฎา3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0008 ถนนรัษฎา3.jpg', 'image', NULL, 'ad025f8a-1840-454c-8916-c4a307d6780a', '2026-03-30 19:20:00.608', NULL, NULL, NULL, NULL, 878);
INSERT INTO "public"."Uploads" VALUES (123, 'ตง.ถ.2-0008 ถนนรัษฎา4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0008 ถนนรัษฎา4.jpg', 'image', NULL, '1abe187c-5360-4312-b172-5be39de331ce', '2026-03-30 19:20:00.608', NULL, NULL, NULL, NULL, 878);
INSERT INTO "public"."Uploads" VALUES (124, 'ตง.ถ.2-0008 ถนนรัษฎา5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0008 ถนนรัษฎา5.jpg', 'image', NULL, '9a88f209-6628-44e7-a079-95739960ec74', '2026-03-30 19:20:00.608', NULL, NULL, NULL, NULL, 878);
INSERT INTO "public"."Uploads" VALUES (125, 'ตง.ถ.2-0008 ถนนรัษฎา6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0008 ถนนรัษฎา6.jpg', 'image', NULL, '6cc7038a-c24c-4094-8289-6b1bcdf516f9', '2026-03-30 19:20:00.609', NULL, NULL, NULL, NULL, 878);
INSERT INTO "public"."Uploads" VALUES (126, 'ตง.ถ.2-0008 ถนนรัษฎา7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0008 ถนนรัษฎา7.jpg', 'image', NULL, 'bcb63b67-5642-49b0-b319-ca0b88f246e0', '2026-03-30 19:20:00.609', NULL, NULL, NULL, NULL, 878);
INSERT INTO "public"."Uploads" VALUES (127, 'ตง.ถ.2-0009 ถนนเจิมปัญญา1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0009 ถนนเจิมปัญญา1.jpg', 'image', NULL, '10ab169f-5175-4cee-b551-ca47389d24e9', '2026-03-30 19:20:00.61', NULL, NULL, NULL, NULL, 879);
INSERT INTO "public"."Uploads" VALUES (128, 'ตง.ถ.2-0009 ถนนเจิมปัญญา2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0009 ถนนเจิมปัญญา2.jpg', 'image', NULL, '470ea79c-53cb-459b-9db6-b50c68504ef0', '2026-03-30 19:20:00.61', NULL, NULL, NULL, NULL, 879);
INSERT INTO "public"."Uploads" VALUES (129, 'ตง.ถ.2-0009 ถนนเจิมปัญญา3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0009 ถนนเจิมปัญญา3.jpg', 'image', NULL, '2663f2c6-3886-4649-9e60-fe76d02cd9a1', '2026-03-30 19:20:00.611', NULL, NULL, NULL, NULL, 879);
INSERT INTO "public"."Uploads" VALUES (130, 'ตง.ถ.2-0009 ถนนเจิมปัญญา4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0009 ถนนเจิมปัญญา4.jpg', 'image', NULL, '7327aadb-51e6-45da-a1a7-d41440bf52fa', '2026-03-30 19:20:00.611', NULL, NULL, NULL, NULL, 879);
INSERT INTO "public"."Uploads" VALUES (131, 'ตง.ถ.2-0009 ถนนเจิมปัญญา5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0009 ถนนเจิมปัญญา5.jpg', 'image', NULL, '40d95f84-82cb-4cd1-a1b4-084967b7de47', '2026-03-30 19:20:00.612', NULL, NULL, NULL, NULL, 879);
INSERT INTO "public"."Uploads" VALUES (132, 'ตง.ถ.2-0009 ถนนเจิมปัญญา6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0009 ถนนเจิมปัญญา6.jpg', 'image', NULL, 'f1cc26e2-5e29-4488-935f-ffea0d84812b', '2026-03-30 19:20:00.612', NULL, NULL, NULL, NULL, 879);
INSERT INTO "public"."Uploads" VALUES (133, 'ตง.ถ.2-0009 ถนนเจิมปัญญา7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0009 ถนนเจิมปัญญา7.jpg', 'image', NULL, '938313f8-7490-4baf-b579-d52c5861eca9', '2026-03-30 19:20:00.612', NULL, NULL, NULL, NULL, 879);
INSERT INTO "public"."Uploads" VALUES (134, 'ตง.ถ.2-0010 ถนนบางรัก1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0010 ถนนบางรัก1.jpg', 'image', NULL, '162e3061-f284-48f8-8334-b3ab116cc398', '2026-03-30 19:20:00.613', NULL, NULL, NULL, NULL, 880);
INSERT INTO "public"."Uploads" VALUES (135, 'ตง.ถ.2-0010 ถนนบางรัก2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0010 ถนนบางรัก2.jpg', 'image', NULL, 'a2c0e4bc-ce84-489f-b0f4-e941838953cf', '2026-03-30 19:20:00.613', NULL, NULL, NULL, NULL, 880);
INSERT INTO "public"."Uploads" VALUES (136, 'ตง.ถ.2-0010 ถนนบางรัก3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0010 ถนนบางรัก3.jpg', 'image', NULL, '124c1598-6e4c-479f-be12-2e3b0d0d600f', '2026-03-30 19:20:00.614', NULL, NULL, NULL, NULL, 880);
INSERT INTO "public"."Uploads" VALUES (137, 'ตง.ถ.2-0010 ถนนบางรัก4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0010 ถนนบางรัก4.jpg', 'image', NULL, '66f86dc1-2ad0-4ee6-bca6-4581d9972f28', '2026-03-30 19:20:00.614', NULL, NULL, NULL, NULL, 880);
INSERT INTO "public"."Uploads" VALUES (138, 'ตง.ถ.2-0010 ถนนบางรัก5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0010 ถนนบางรัก5.jpg', 'image', NULL, '87fd9382-1dc9-4dde-90ad-a3495b60781a', '2026-03-30 19:20:00.614', NULL, NULL, NULL, NULL, 880);
INSERT INTO "public"."Uploads" VALUES (139, 'ตง.ถ.2-0010 ถนนบางรัก6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0010 ถนนบางรัก6.jpg', 'image', NULL, '706d2f71-ec8f-4217-838d-091c04e2990b', '2026-03-30 19:20:00.615', NULL, NULL, NULL, NULL, 880);
INSERT INTO "public"."Uploads" VALUES (140, 'ตง.ถ.2-0010 ถนนบางรัก7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0010 ถนนบางรัก7.jpg', 'image', NULL, '9f4f720b-32e9-4c5c-8a01-9b0cc326a4a4', '2026-03-30 19:20:00.615', NULL, NULL, NULL, NULL, 880);
INSERT INTO "public"."Uploads" VALUES (141, 'ตง.ถ.2-0011 ถนนจริงจิตร1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0011 ถนนจริงจิตร1.jpg', 'image', NULL, '3d2bdc83-2465-48eb-9906-1d52a934dbdc', '2026-03-30 19:20:00.615', NULL, NULL, NULL, NULL, 881);
INSERT INTO "public"."Uploads" VALUES (142, 'ตง.ถ.2-0011 ถนนจริงจิตร2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0011 ถนนจริงจิตร2.jpg', 'image', NULL, 'f5c08127-112e-4c53-904f-a527aabd3bed', '2026-03-30 19:20:00.616', NULL, NULL, NULL, NULL, 881);
INSERT INTO "public"."Uploads" VALUES (143, 'ตง.ถ.2-0011 ถนนจริงจิตร3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0011 ถนนจริงจิตร3.jpg', 'image', NULL, 'd85397e6-9b09-4f8e-b83c-fbf8c767cd1f', '2026-03-30 19:20:00.617', NULL, NULL, NULL, NULL, 881);
INSERT INTO "public"."Uploads" VALUES (144, 'ตง.ถ.2-0011 ถนนจริงจิตร4.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0011 ถนนจริงจิตร4.jpg', 'image', NULL, '33b2f70b-aaf6-4b69-a1c7-4cc381b01375', '2026-03-30 19:20:00.617', NULL, NULL, NULL, NULL, 881);
INSERT INTO "public"."Uploads" VALUES (145, 'ตง.ถ.2-0011 ถนนจริงจิตร5.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0011 ถนนจริงจิตร5.jpg', 'image', NULL, '96545775-8de7-4aad-bb83-3ef83e656474', '2026-03-30 19:20:00.618', NULL, NULL, NULL, NULL, 881);
INSERT INTO "public"."Uploads" VALUES (146, 'ตง.ถ.2-0011 ถนนจริงจิตร6.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0011 ถนนจริงจิตร6.jpg', 'image', NULL, 'a39639e1-103a-40c5-b149-2cf90ca8916a', '2026-03-30 19:20:00.618', NULL, NULL, NULL, NULL, 881);
INSERT INTO "public"."Uploads" VALUES (147, 'ตง.ถ.2-0011 ถนนจริงจิตร7.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0011 ถนนจริงจิตร7.jpg', 'image', NULL, '3db18604-e559-49e7-b269-c62accf6693c', '2026-03-30 19:20:00.619', NULL, NULL, NULL, NULL, 881);
INSERT INTO "public"."Uploads" VALUES (986, 'ตง.ถ.2-0124 ถนนเพลินพิทักษ์ ซอย141.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0124 ถนนเพลินพิทักษ์ ซอย141.jpg', 'image', NULL, '4662bd20-3e53-4dd4-a1ac-441cb659b2f8', '2026-03-30 19:20:01.155', NULL, NULL, NULL, NULL, 987);
INSERT INTO "public"."Uploads" VALUES (987, 'ตง.ถ.2-0124 ถนนเพลินพิทักษ์ ซอย142.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0124 ถนนเพลินพิทักษ์ ซอย142.jpg', 'image', NULL, '11ad30a8-c725-40f2-b63c-7725e038604e', '2026-03-30 19:20:01.156', NULL, NULL, NULL, NULL, 987);
INSERT INTO "public"."Uploads" VALUES (988, 'ตง.ถ.2-0124 ถนนเพลินพิทักษ์ ซอย143.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0124 ถนนเพลินพิทักษ์ ซอย143.jpg', 'image', NULL, '58a6cc52-7616-4e22-9604-96a2b322c39d', '2026-03-30 19:20:01.157', NULL, NULL, NULL, NULL, 987);
INSERT INTO "public"."Uploads" VALUES (989, 'ตง.ถ.2-0124 ถนนเพลินพิทักษ์ ซอย144.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0124 ถนนเพลินพิทักษ์ ซอย144.jpg', 'image', NULL, '4b94d6a8-1a93-4204-9e38-20ca05aabef5', '2026-03-30 19:20:01.157', NULL, NULL, NULL, NULL, 987);
INSERT INTO "public"."Uploads" VALUES (990, 'ตง.ถ.2-0124 ถนนเพลินพิทักษ์ ซอย145.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0124 ถนนเพลินพิทักษ์ ซอย145.jpg', 'image', NULL, 'e3b8b6ff-3f16-447d-b7bc-cb226745d459', '2026-03-30 19:20:01.158', NULL, NULL, NULL, NULL, 987);
INSERT INTO "public"."Uploads" VALUES (991, 'ตง.ถ.2-0124 ถนนเพลินพิทักษ์ ซอย146.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0124 ถนนเพลินพิทักษ์ ซอย146.jpg', 'image', NULL, '93ef4eb3-a1bf-44df-b7e3-a2b348e80ebd', '2026-03-30 19:20:01.158', NULL, NULL, NULL, NULL, 987);
INSERT INTO "public"."Uploads" VALUES (992, 'ตง.ถ.2-0124 ถนนเพลินพิทักษ์ ซอย147.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0124 ถนนเพลินพิทักษ์ ซอย147.jpg', 'image', NULL, '2b715665-1018-4ee7-8525-6ae5985ec535', '2026-03-30 19:20:01.159', NULL, NULL, NULL, NULL, 987);
INSERT INTO "public"."Uploads" VALUES (1031, 'ตง.ถ.2-0129 ถนเวียนกะพัง ซอย 61.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0129 ถนเวียนกะพัง ซอย 61.jpg', 'image', NULL, '08cb8524-f7e8-4924-86cd-94cabaaa7e4b', '2026-03-30 19:20:01.183', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (1032, 'ตง.ถ.2-0129 ถนเวียนกะพัง ซอย 62.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0129 ถนเวียนกะพัง ซอย 62.jpg', 'image', NULL, '2c4f8297-bcd8-4a08-a540-adc59ae6dfc7', '2026-03-30 19:20:01.184', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (1033, 'ตง.ถ.2-0129 ถนเวียนกะพัง ซอย 63.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0129 ถนเวียนกะพัง ซอย 63.jpg', 'image', NULL, '0b156a8f-3d83-4034-9dae-b71f60a06499', '2026-03-30 19:20:01.184', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (1034, 'ตง.ถ.2-0129 ถนเวียนกะพัง ซอย 64.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0129 ถนเวียนกะพัง ซอย 64.jpg', 'image', NULL, 'c7f3fbc0-d17a-49cd-9e07-d6d209289879', '2026-03-30 19:20:01.184', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (1035, 'ตง.ถ.2-0129 ถนเวียนกะพัง ซอย 65.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0129 ถนเวียนกะพัง ซอย 65.jpg', 'image', NULL, '9adaaea0-8d7a-4159-957c-6ad89c8c91cc', '2026-03-30 19:20:01.185', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (1036, 'ตง.ถ.2-0129 ถนเวียนกะพัง ซอย 66.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0129 ถนเวียนกะพัง ซอย 66.jpg', 'image', NULL, '81f93f0a-27d9-4141-8663-24895ba718b0', '2026-03-30 19:20:01.185', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (993, 'ตง.ถ.2-0124 ถนนเพลินพิทักษ์ ซอย148.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0124 ถนนเพลินพิทักษ์ ซอย148.jpg', 'image', NULL, '407c61dc-3201-4ff2-adf5-8326a5b3b4f2', '2026-03-30 19:20:01.159', NULL, NULL, NULL, NULL, 987);
INSERT INTO "public"."Uploads" VALUES (994, 'ตง.ถ.2-0124 ถนนเพลินพิทักษ์ ซอย149.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0124 ถนนเพลินพิทักษ์ ซอย149.jpg', 'image', NULL, '9d651796-74cf-4e82-8dbe-2f115c7e2a12', '2026-03-30 19:20:01.16', NULL, NULL, NULL, NULL, 987);
INSERT INTO "public"."Uploads" VALUES (1037, 'ตง.ถ.2-0129 ถนเวียนกะพัง ซอย 67.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0129 ถนเวียนกะพัง ซอย 67.jpg', 'image', NULL, 'f59b03b8-b6bd-4fa6-9a68-c40f99af83d4', '2026-03-30 19:20:01.186', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (1038, 'ตง.ถ.2-0129 ถนเวียนกะพัง ซอย 68.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0129 ถนเวียนกะพัง ซอย 68.jpg', 'image', NULL, '7cb25ef0-e919-4fcf-be7f-570f91c2aa68', '2026-03-30 19:20:01.187', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (1039, 'ตง.ถ.2-0129 ถนเวียนกะพัง ซอย 69.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0129 ถนเวียนกะพัง ซอย 69.jpg', 'image', NULL, '6e8f34ac-825b-4089-92f0-2a6420eca242', '2026-03-30 19:20:01.188', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (1115, 'ตง.ถ.2-0141 ถนนวังตอ ซอย 1-11.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0141 ถนนวังตอ ซอย 1-11.jpg', 'image', NULL, '7231b1cb-42ea-4501-8808-f5dc9045a401', '2026-03-30 19:20:01.234', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (1116, 'ตง.ถ.2-0141 ถนนวังตอ ซอย 1-12.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0141 ถนนวังตอ ซอย 1-12.jpg', 'image', NULL, 'cef09026-025f-4e63-bc32-22979d3a5cf8', '2026-03-30 19:20:01.235', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (1117, 'ตง.ถ.2-0141 ถนนวังตอ ซอย 1-13.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0141 ถนนวังตอ ซอย 1-13.jpg', 'image', NULL, '9f561220-2906-4f83-a89c-82f223037052', '2026-03-30 19:20:01.236', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (1130, 'ตง.ถ.2-0146 ถนนวังตอ ซอย 4-1(แยกวังตอซอย4)1.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0146 ถนนวังตอ ซอย 4-1(แยกวังตอซอย4)1.jpg', 'image', NULL, '7ac79ad4-c54d-47ff-83af-e0cd3e088c7e', '2026-03-30 19:20:01.244', NULL, NULL, NULL, NULL, 1007);
INSERT INTO "public"."Uploads" VALUES (1131, 'ตง.ถ.2-0146 ถนนวังตอ ซอย 4-1(แยกวังตอซอย4)2.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0146 ถนนวังตอ ซอย 4-1(แยกวังตอซอย4)2.jpg', 'image', NULL, '73a38310-4627-45fa-b4df-6f5f8561eb27', '2026-03-30 19:20:01.245', NULL, NULL, NULL, NULL, 1007);
INSERT INTO "public"."Uploads" VALUES (1132, 'ตง.ถ.2-0146 ถนนวังตอ ซอย 4-1(แยกวังตอซอย4)3.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0146 ถนนวังตอ ซอย 4-1(แยกวังตอซอย4)3.jpg', 'image', NULL, 'e0c2d2d6-ad88-464b-84e8-926d1147f4b8', '2026-03-30 19:20:01.245', NULL, NULL, NULL, NULL, 1007);
INSERT INTO "public"."Uploads" VALUES (1124, 'ตง.ถ.2-0144 ถนนวังตอ ซอย 31.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0144 ถนนวังตอ ซอย 31.jpg', 'image', NULL, '5978e18c-1d34-473b-8d28-229ae2ab40e3', '2026-03-30 19:20:01.24', NULL, NULL, NULL, NULL, 1005);
INSERT INTO "public"."Uploads" VALUES (1125, 'ตง.ถ.2-0144 ถนนวังตอ ซอย 32.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0144 ถนนวังตอ ซอย 32.jpg', 'image', NULL, '5638a88c-b544-4fde-a172-d57b28268b70', '2026-03-30 19:20:01.241', NULL, NULL, NULL, NULL, 1005);
INSERT INTO "public"."Uploads" VALUES (1126, 'ตง.ถ.2-0144 ถนนวังตอ ซอย 33.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0144 ถนนวังตอ ซอย 33.jpg', 'image', NULL, '1fceca25-968b-44cb-8cee-e7a1e59c89fa', '2026-03-30 19:20:01.241', NULL, NULL, NULL, NULL, 1005);
INSERT INTO "public"."Uploads" VALUES (1139, 'ตง.ถ.2-0149 ถนนรัษฎา ซอย 31.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0149 ถนนรัษฎา ซอย 31.jpg', 'image', NULL, '1e64f1c2-9b51-4382-a8c5-a30d2432b5cd', '2026-03-30 19:20:01.249', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (1140, 'ตง.ถ.2-0149 ถนนรัษฎา ซอย 32.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0149 ถนนรัษฎา ซอย 32.jpg', 'image', NULL, 'e4eeb841-4cef-4306-a3d3-cc0c038adbde', '2026-03-30 19:20:01.25', NULL, NULL, NULL, NULL, NULL);
INSERT INTO "public"."Uploads" VALUES (1141, 'ตง.ถ.2-0149 ถนนรัษฎา ซอย 33.jpg', 'http://localhost:3001/uploads/images/ตง.ถ.2-0149 ถนนรัษฎา ซอย 33.jpg', 'image', NULL, 'ae43d413-2498-4062-a691-11d9eadcacd4', '2026-03-30 19:20:01.25', NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for User
-- ----------------------------
DROP TABLE IF EXISTS "public"."User";
CREATE TABLE "public"."User" (
  "id" int4 NOT NULL DEFAULT nextval('"User_id_seq"'::regclass),
  "username" text COLLATE "pg_catalog"."default" NOT NULL,
  "password" text COLLATE "pg_catalog"."default" NOT NULL,
  "title_use" text COLLATE "pg_catalog"."default" NOT NULL,
  "fullName" text COLLATE "pg_catalog"."default" NOT NULL,
  "address" text COLLATE "pg_catalog"."default",
  "position" text COLLATE "pg_catalog"."default",
  "email" text COLLATE "pg_catalog"."default",
  "phone" text COLLATE "pg_catalog"."default",
  "role" text COLLATE "pg_catalog"."default" NOT NULL,
  "resetToken" text COLLATE "pg_catalog"."default",
  "resetTokenExpiry" timestamp(3),
  "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Records of User
-- ----------------------------
INSERT INTO "public"."User" VALUES (1, 'admin', '$2a$10$4rCsLwwgXS2HINzL8YofT.AdgGvI9JjNbVtYDc9GMoKQs5ZAPwxlC', 'นาย', 'ผู้ดูแลระบบ (ทดสอบ)', '123 ถนนราชดำเนิน กรุงเทพฯ', 'ผู้ดูแลระบบ', 'admin@test.com', '0811111111', 'admin', NULL, NULL, '2026-03-17 16:35:15.902');
INSERT INTO "public"."User" VALUES (2, 'admin123', '$2a$10$0tBCdq/VJAaZKtMjBYqce.m05/3Ch8RlYXATsONfRW2u.D7EMcPLi', 'นาย', 'ผู้ดูแลระบบ', '123 ถนนราชดำเนิน กรุงเทพฯ', 'ผู้ดูแลระบบ', 'admin@example.com', '0811111111', 'admin', NULL, NULL, '2026-03-17 16:35:15.978');
INSERT INTO "public"."User" VALUES (3, 'officer', '$2a$10$LTzxkZrKhaAzPE/1XJsBSeY6vMh1umF.n4omVUb8cgWl7V6reMQim', 'นาง', 'เจ้าหน้าที่ภาคสนาม', '456 ถนนสุขุมวิท กรุงเทพฯ', 'เจ้าหน้าที่ภาคสนาม', 'officer@example.com', '0822222222', 'officer', NULL, NULL, '2026-03-17 16:35:16.045');
INSERT INTO "public"."User" VALUES (4, 'viewer', '$2a$10$DZaKsPdjEGP5XYDSbJWep.EnBB9Z4.wgm5bUHATOrkLufVUJX.RQW', 'นาย', 'ผู้ดูข้อมูล', '789 ถนนรัชดาภิเษก กรุงเทพฯ', 'ผู้ดูข้อมูล', 'viewer@example.com', '0833333333', 'viewer', NULL, NULL, '2026-03-17 16:35:16.113');

-- ----------------------------
-- Table structure for VisitLog
-- ----------------------------
DROP TABLE IF EXISTS "public"."VisitLog";
CREATE TABLE "public"."VisitLog" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "visitorId" text COLLATE "pg_catalog"."default" NOT NULL,
  "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Records of VisitLog
-- ----------------------------
INSERT INTO "public"."VisitLog" VALUES ('96af0442-9b84-450a-ae8c-add90c90c313', '11813333-bff8-46cc-89a6-889eda2dfb77', '2026-03-29 11:06:22.07');
INSERT INTO "public"."VisitLog" VALUES ('be517f9a-9d06-47f5-983a-edc6eef8c6d2', '11813333-bff8-46cc-89a6-889eda2dfb77', '2026-03-29 11:06:22.107');
INSERT INTO "public"."VisitLog" VALUES ('aa8ad650-86d2-4082-9bf3-60cec4eabc02', '11813333-bff8-46cc-89a6-889eda2dfb77', '2026-03-29 11:38:41.669');
INSERT INTO "public"."VisitLog" VALUES ('4c73e0de-6811-4dcb-9822-9c2f786a7eb0', '11813333-bff8-46cc-89a6-889eda2dfb77', '2026-03-29 12:16:14.213');
INSERT INTO "public"."VisitLog" VALUES ('e62502c1-3a16-4e7c-b43a-e4637b7e412f', '11813333-bff8-46cc-89a6-889eda2dfb77', '2026-03-29 12:48:01.977');
INSERT INTO "public"."VisitLog" VALUES ('f3afdd3c-646d-4bf9-8bb8-3def93a5a6f0', '11813333-bff8-46cc-89a6-889eda2dfb77', '2026-03-30 02:21:50.168');
INSERT INTO "public"."VisitLog" VALUES ('1b3fe909-dba4-4ddb-a75a-881e2e40d93c', '11813333-bff8-46cc-89a6-889eda2dfb77', '2026-03-30 10:31:17.806');
INSERT INTO "public"."VisitLog" VALUES ('a13c4887-53a3-44e5-b1ad-5d4527b1b91e', '11813333-bff8-46cc-89a6-889eda2dfb77', '2026-03-30 11:37:54.015');
INSERT INTO "public"."VisitLog" VALUES ('46606ecf-79c3-4421-b167-6e06b85b6aca', '11813333-bff8-46cc-89a6-889eda2dfb77', '2026-03-30 12:38:14.512');
INSERT INTO "public"."VisitLog" VALUES ('72251c95-2d0a-42cd-864b-81b5f1c1b74a', '11813333-bff8-46cc-89a6-889eda2dfb77', '2026-03-30 16:53:49.486');
INSERT INTO "public"."VisitLog" VALUES ('54a09c44-21e5-454e-be3d-0e04f99b6950', '11813333-bff8-46cc-89a6-889eda2dfb77', '2026-03-30 18:02:20.836');
INSERT INTO "public"."VisitLog" VALUES ('4578fd9a-2f74-44f8-bf36-21d8cdc2e9e2', '11813333-bff8-46cc-89a6-889eda2dfb77', '2026-03-30 18:41:14.99');

-- ----------------------------
-- Table structure for Visitor
-- ----------------------------
DROP TABLE IF EXISTS "public"."Visitor";
CREATE TABLE "public"."Visitor" (
  "id" text COLLATE "pg_catalog"."default" NOT NULL,
  "visitorId" text COLLATE "pg_catalog"."default" NOT NULL,
  "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Records of Visitor
-- ----------------------------
INSERT INTO "public"."Visitor" VALUES ('019f571f-3b38-428b-aef3-a2ae2bb53430', '11813333-bff8-46cc-89a6-889eda2dfb77', '2026-03-29 11:06:21.93', '2026-03-30 18:41:14.799');

-- ----------------------------
-- Table structure for ZoningPlan
-- ----------------------------
DROP TABLE IF EXISTS "public"."ZoningPlan";
CREATE TABLE "public"."ZoningPlan" (
  "id" int4 NOT NULL DEFAULT nextval('"ZoningPlan_id_seq"'::regclass),
  "areaName" text COLLATE "pg_catalog"."default" NOT NULL,
  "notes" text COLLATE "pg_catalog"."default",
  "fiscalYearId" int4,
  "status" text COLLATE "pg_catalog"."default",
  "owner_id" int4,
  "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) NOT NULL
)
;

-- ----------------------------
-- Records of ZoningPlan
-- ----------------------------
INSERT INTO "public"."ZoningPlan" VALUES (16, 'เขตการศึกษา999', NULL, NULL, NULL, NULL, '2026-03-30 11:46:06.41', '2026-03-30 11:46:06.41', '2026-03-30 11:46:06.41');

-- ----------------------------
-- Table structure for _ApprovedProjectUploads
-- ----------------------------
DROP TABLE IF EXISTS "public"."_ApprovedProjectUploads";
CREATE TABLE "public"."_ApprovedProjectUploads" (
  "A" int4 NOT NULL,
  "B" int4 NOT NULL
)
;

-- ----------------------------
-- Records of _ApprovedProjectUploads
-- ----------------------------

-- ----------------------------
-- Table structure for _BuildPlanUploads
-- ----------------------------
DROP TABLE IF EXISTS "public"."_BuildPlanUploads";
CREATE TABLE "public"."_BuildPlanUploads" (
  "A" int4 NOT NULL,
  "B" int4 NOT NULL
)
;

-- ----------------------------
-- Records of _BuildPlanUploads
-- ----------------------------

-- ----------------------------
-- Table structure for _BuildingControlUploads
-- ----------------------------
DROP TABLE IF EXISTS "public"."_BuildingControlUploads";
CREATE TABLE "public"."_BuildingControlUploads" (
  "A" int4 NOT NULL,
  "B" int4 NOT NULL
)
;

-- ----------------------------
-- Records of _BuildingControlUploads
-- ----------------------------

-- ----------------------------
-- Table structure for _MapUploads
-- ----------------------------
DROP TABLE IF EXISTS "public"."_MapUploads";
CREATE TABLE "public"."_MapUploads" (
  "A" int4 NOT NULL,
  "B" int4 NOT NULL
)
;

-- ----------------------------
-- Records of _MapUploads
-- ----------------------------

-- ----------------------------
-- Table structure for _PlanProjectUploads
-- ----------------------------
DROP TABLE IF EXISTS "public"."_PlanProjectUploads";
CREATE TABLE "public"."_PlanProjectUploads" (
  "A" int4 NOT NULL,
  "B" int4 NOT NULL
)
;

-- ----------------------------
-- Records of _PlanProjectUploads
-- ----------------------------

-- ----------------------------
-- Table structure for _RiskZoneUploads
-- ----------------------------
DROP TABLE IF EXISTS "public"."_RiskZoneUploads";
CREATE TABLE "public"."_RiskZoneUploads" (
  "A" int4 NOT NULL,
  "B" int4 NOT NULL
)
;

-- ----------------------------
-- Records of _RiskZoneUploads
-- ----------------------------

-- ----------------------------
-- Table structure for _ZoningPlanUploads
-- ----------------------------
DROP TABLE IF EXISTS "public"."_ZoningPlanUploads";
CREATE TABLE "public"."_ZoningPlanUploads" (
  "A" int4 NOT NULL,
  "B" int4 NOT NULL
)
;

-- ----------------------------
-- Records of _ZoningPlanUploads
-- ----------------------------

-- ----------------------------
-- Table structure for _prisma_migrations
-- ----------------------------
DROP TABLE IF EXISTS "public"."_prisma_migrations";
CREATE TABLE "public"."_prisma_migrations" (
  "id" varchar(36) COLLATE "pg_catalog"."default" NOT NULL,
  "checksum" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "finished_at" timestamptz(6),
  "migration_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "logs" text COLLATE "pg_catalog"."default",
  "rolled_back_at" timestamptz(6),
  "started_at" timestamptz(6) NOT NULL DEFAULT now(),
  "applied_steps_count" int4 NOT NULL DEFAULT 0
)
;

-- ----------------------------
-- Records of _prisma_migrations
-- ----------------------------
INSERT INTO "public"."_prisma_migrations" VALUES ('3ed7f6e4-2d94-4874-886d-3de374cddbfb', 'e185f4a735c6aa208cc466cc1585bae653101cf34bce74fbe76c36b6830436b6', '2026-03-17 23:32:57.571524+07', '20251019070429_init_clean_schema', NULL, NULL, '2026-03-17 23:32:57.364424+07', 1);
INSERT INTO "public"."_prisma_migrations" VALUES ('21f23db6-02d6-42df-9e3e-387d92ee8ba0', '167a0fcf3311a8a037d1290db6fb1dcb826e455ea98186fd59571b2f9ca115cc', '2026-03-17 23:32:57.575334+07', '20251019071835_tablenew', NULL, NULL, '2026-03-17 23:32:57.572367+07', 1);
INSERT INTO "public"."_prisma_migrations" VALUES ('b620f6ed-28f1-404f-9a33-98d055bef80b', '33d0ebda3448551884b373c39fd2c84fb01c157a1ab1eaa0be36a9ff40208533', '2026-03-17 23:32:57.578734+07', '20251019152951_update_date', NULL, NULL, '2026-03-17 23:32:57.576196+07', 1);
INSERT INTO "public"."_prisma_migrations" VALUES ('c6b270ed-9d43-4b11-8f77-2426481fcb80', 'e425713a5355a058d4de6e391b9aedfb54760936a75ac114f90e864413ad932e', '2026-03-17 23:33:12.786304+07', '20260317163312_', NULL, NULL, '2026-03-17 23:33:12.715437+07', 1);

-- ----------------------------
-- Table structure for districts
-- ----------------------------
DROP TABLE IF EXISTS "public"."districts";
CREATE TABLE "public"."districts" (
  "id" int4 NOT NULL DEFAULT nextval('districts_id_seq'::regclass),
  "district_code" text COLLATE "pg_catalog"."default" NOT NULL,
  "province" text COLLATE "pg_catalog"."default" NOT NULL,
  "amphoe" text COLLATE "pg_catalog"."default" NOT NULL,
  "district" text COLLATE "pg_catalog"."default" NOT NULL,
  "zipcode" text COLLATE "pg_catalog"."default" NOT NULL,
  "province_code" text COLLATE "pg_catalog"."default" NOT NULL,
  "amphoe_code" text COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of districts
-- ----------------------------

-- ----------------------------
-- Table structure for planproject
-- ----------------------------
DROP TABLE IF EXISTS "public"."planproject";
CREATE TABLE "public"."planproject" (
  "id" int4 NOT NULL,
  "name_pro" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "road_name" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Records of planproject
-- ----------------------------

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."ApprovedProject_id_seq"
OWNED BY "public"."ApprovedProject"."id";
SELECT setval('"public"."ApprovedProject_id_seq"', 11, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."BuildPlan_id_seq"
OWNED BY "public"."BuildPlan"."id";
SELECT setval('"public"."BuildPlan_id_seq"', 5, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."BuildingControl_id_seq"
OWNED BY "public"."BuildingControl"."id";
SELECT setval('"public"."BuildingControl_id_seq"', 26, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."FiscalYear_id_seq"
OWNED BY "public"."FiscalYear"."id";
SELECT setval('"public"."FiscalYear_id_seq"', 3, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."Map_id_seq"
OWNED BY "public"."Map"."id";
SELECT setval('"public"."Map_id_seq"', 1012, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."Owner_id_seq"
OWNED BY "public"."Owner"."id";
SELECT setval('"public"."Owner_id_seq"', 17, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."PlanProject_id_seq"
OWNED BY "public"."PlanProject"."id";
SELECT setval('"public"."PlanProject_id_seq"', 162, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."RiskZone_id_seq"
OWNED BY "public"."RiskZone"."id";
SELECT setval('"public"."RiskZone_id_seq"', 185, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."Uploads_id_seq"
OWNED BY "public"."Uploads"."id";
SELECT setval('"public"."Uploads_id_seq"', 1153, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."User_id_seq"
OWNED BY "public"."User"."id";
SELECT setval('"public"."User_id_seq"', 4, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."ZoningPlan_id_seq"
OWNED BY "public"."ZoningPlan"."id";
SELECT setval('"public"."ZoningPlan_id_seq"', 16, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."districts_id_seq"
OWNED BY "public"."districts"."id";
SELECT setval('"public"."districts_id_seq"', 1, false);

-- ----------------------------
-- Indexes structure for table ApprovedProject
-- ----------------------------
CREATE INDEX "ApprovedProject_fiscalYearId_idx" ON "public"."ApprovedProject" USING btree (
  "fiscalYearId" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "ApprovedProject_user_id_idx" ON "public"."ApprovedProject" USING btree (
  "user_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table ApprovedProject
-- ----------------------------
ALTER TABLE "public"."ApprovedProject" ADD CONSTRAINT "ApprovedProject_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table BuildPlan
-- ----------------------------
ALTER TABLE "public"."BuildPlan" ADD CONSTRAINT "BuildPlan_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table BuildingControl
-- ----------------------------
CREATE INDEX "BuildingControl_fiscalYearId_idx" ON "public"."BuildingControl" USING btree (
  "fiscalYearId" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "BuildingControl_owner_id_idx" ON "public"."BuildingControl" USING btree (
  "owner_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table BuildingControl
-- ----------------------------
ALTER TABLE "public"."BuildingControl" ADD CONSTRAINT "BuildingControl_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table FiscalYear
-- ----------------------------
ALTER TABLE "public"."FiscalYear" ADD CONSTRAINT "FiscalYear_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table Map
-- ----------------------------
CREATE INDEX "Map_approvedProjectId_idx" ON "public"."Map" USING btree (
  "approvedProjectId" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "Map_approvedProjectId_key" ON "public"."Map" USING btree (
  "approvedProjectId" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "Map_buildingControlId_idx" ON "public"."Map" USING btree (
  "buildingControlId" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "Map_buildingControlId_key" ON "public"."Map" USING btree (
  "buildingControlId" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "Map_palnbuildId_key" ON "public"."Map" USING btree (
  "palnbuildId" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "Map_planProjectId_idx" ON "public"."Map" USING btree (
  "planProjectId" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "Map_planProjectId_key" ON "public"."Map" USING btree (
  "planProjectId" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "Map_riskZoneId_idx" ON "public"."Map" USING btree (
  "riskZoneId" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "Map_riskZoneId_key" ON "public"."Map" USING btree (
  "riskZoneId" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "Map_zoningPlanId_idx" ON "public"."Map" USING btree (
  "zoningPlanId" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "Map_zoningPlanId_key" ON "public"."Map" USING btree (
  "zoningPlanId" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table Map
-- ----------------------------
ALTER TABLE "public"."Map" ADD CONSTRAINT "Map_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table Owner
-- ----------------------------
CREATE UNIQUE INDEX "Owner_number_no_key" ON "public"."Owner" USING btree (
  "number_no" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table Owner
-- ----------------------------
ALTER TABLE "public"."Owner" ADD CONSTRAINT "Owner_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table PlanProject
-- ----------------------------
CREATE UNIQUE INDEX "PlanProject_code_key" ON "public"."PlanProject" USING btree (
  "code" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE INDEX "PlanProject_fiscalYearId_idx" ON "public"."PlanProject" USING btree (
  "fiscalYearId" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "PlanProject_user_id_idx" ON "public"."PlanProject" USING btree (
  "user_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table PlanProject
-- ----------------------------
ALTER TABLE "public"."PlanProject" ADD CONSTRAINT "PlanProject_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table RiskZone
-- ----------------------------
CREATE INDEX "RiskZone_fiscalYearId_idx" ON "public"."RiskZone" USING btree (
  "fiscalYearId" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "RiskZone_owner_id_idx" ON "public"."RiskZone" USING btree (
  "owner_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table RiskZone
-- ----------------------------
ALTER TABLE "public"."RiskZone" ADD CONSTRAINT "RiskZone_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table Uploads
-- ----------------------------
CREATE UNIQUE INDEX "Uploads_token_key" ON "public"."Uploads" USING btree (
  "token" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table Uploads
-- ----------------------------
ALTER TABLE "public"."Uploads" ADD CONSTRAINT "Uploads_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table User
-- ----------------------------
CREATE UNIQUE INDEX "User_email_key" ON "public"."User" USING btree (
  "email" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "User_username_key" ON "public"."User" USING btree (
  "username" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table User
-- ----------------------------
ALTER TABLE "public"."User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table VisitLog
-- ----------------------------
ALTER TABLE "public"."VisitLog" ADD CONSTRAINT "VisitLog_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table Visitor
-- ----------------------------
CREATE UNIQUE INDEX "Visitor_visitorId_key" ON "public"."Visitor" USING btree (
  "visitorId" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table Visitor
-- ----------------------------
ALTER TABLE "public"."Visitor" ADD CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table ZoningPlan
-- ----------------------------
CREATE INDEX "ZoningPlan_fiscalYearId_idx" ON "public"."ZoningPlan" USING btree (
  "fiscalYearId" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "ZoningPlan_owner_id_idx" ON "public"."ZoningPlan" USING btree (
  "owner_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table ZoningPlan
-- ----------------------------
ALTER TABLE "public"."ZoningPlan" ADD CONSTRAINT "ZoningPlan_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table _ApprovedProjectUploads
-- ----------------------------
CREATE UNIQUE INDEX "_ApprovedProjectUploads_AB_unique" ON "public"."_ApprovedProjectUploads" USING btree (
  "A" "pg_catalog"."int4_ops" ASC NULLS LAST,
  "B" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "_ApprovedProjectUploads_B_index" ON "public"."_ApprovedProjectUploads" USING btree (
  "B" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Indexes structure for table _BuildPlanUploads
-- ----------------------------
CREATE UNIQUE INDEX "_BuildPlanUploads_AB_unique" ON "public"."_BuildPlanUploads" USING btree (
  "A" "pg_catalog"."int4_ops" ASC NULLS LAST,
  "B" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "_BuildPlanUploads_B_index" ON "public"."_BuildPlanUploads" USING btree (
  "B" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Indexes structure for table _BuildingControlUploads
-- ----------------------------
CREATE UNIQUE INDEX "_BuildingControlUploads_AB_unique" ON "public"."_BuildingControlUploads" USING btree (
  "A" "pg_catalog"."int4_ops" ASC NULLS LAST,
  "B" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "_BuildingControlUploads_B_index" ON "public"."_BuildingControlUploads" USING btree (
  "B" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Indexes structure for table _MapUploads
-- ----------------------------
CREATE UNIQUE INDEX "_MapUploads_AB_unique" ON "public"."_MapUploads" USING btree (
  "A" "pg_catalog"."int4_ops" ASC NULLS LAST,
  "B" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "_MapUploads_B_index" ON "public"."_MapUploads" USING btree (
  "B" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Indexes structure for table _PlanProjectUploads
-- ----------------------------
CREATE UNIQUE INDEX "_PlanProjectUploads_AB_unique" ON "public"."_PlanProjectUploads" USING btree (
  "A" "pg_catalog"."int4_ops" ASC NULLS LAST,
  "B" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "_PlanProjectUploads_B_index" ON "public"."_PlanProjectUploads" USING btree (
  "B" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Indexes structure for table _RiskZoneUploads
-- ----------------------------
CREATE UNIQUE INDEX "_RiskZoneUploads_AB_unique" ON "public"."_RiskZoneUploads" USING btree (
  "A" "pg_catalog"."int4_ops" ASC NULLS LAST,
  "B" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "_RiskZoneUploads_B_index" ON "public"."_RiskZoneUploads" USING btree (
  "B" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Indexes structure for table _ZoningPlanUploads
-- ----------------------------
CREATE UNIQUE INDEX "_ZoningPlanUploads_AB_unique" ON "public"."_ZoningPlanUploads" USING btree (
  "A" "pg_catalog"."int4_ops" ASC NULLS LAST,
  "B" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "_ZoningPlanUploads_B_index" ON "public"."_ZoningPlanUploads" USING btree (
  "B" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table _prisma_migrations
-- ----------------------------
ALTER TABLE "public"."_prisma_migrations" ADD CONSTRAINT "_prisma_migrations_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table districts
-- ----------------------------
ALTER TABLE "public"."districts" ADD CONSTRAINT "districts_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table planproject
-- ----------------------------
ALTER TABLE "public"."planproject" ADD CONSTRAINT "planproject_name_pro_key" UNIQUE ("name_pro");

-- ----------------------------
-- Primary Key structure for table planproject
-- ----------------------------
ALTER TABLE "public"."planproject" ADD CONSTRAINT "planproject_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table ApprovedProject
-- ----------------------------
ALTER TABLE "public"."ApprovedProject" ADD CONSTRAINT "ApprovedProject_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table BuildPlan
-- ----------------------------
ALTER TABLE "public"."BuildPlan" ADD CONSTRAINT "BuildPlan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table Map
-- ----------------------------
ALTER TABLE "public"."Map" ADD CONSTRAINT "Map_approvedProjectId_fkey" FOREIGN KEY ("approvedProjectId") REFERENCES "public"."ApprovedProject" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."Map" ADD CONSTRAINT "Map_buildingControlId_fkey" FOREIGN KEY ("buildingControlId") REFERENCES "public"."BuildingControl" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."Map" ADD CONSTRAINT "Map_palnbuildId_fkey" FOREIGN KEY ("palnbuildId") REFERENCES "public"."BuildPlan" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."Map" ADD CONSTRAINT "Map_planProjectId_fkey" FOREIGN KEY ("planProjectId") REFERENCES "public"."PlanProject" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."Map" ADD CONSTRAINT "Map_riskZoneId_fkey" FOREIGN KEY ("riskZoneId") REFERENCES "public"."RiskZone" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."Map" ADD CONSTRAINT "Map_zoningPlanId_fkey" FOREIGN KEY ("zoningPlanId") REFERENCES "public"."ZoningPlan" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table Owner
-- ----------------------------
ALTER TABLE "public"."Owner" ADD CONSTRAINT "Owner_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table PlanProject
-- ----------------------------
ALTER TABLE "public"."PlanProject" ADD CONSTRAINT "PlanProject_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table Uploads
-- ----------------------------
ALTER TABLE "public"."Uploads" ADD CONSTRAINT "Uploads_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "public"."Map" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table _ApprovedProjectUploads
-- ----------------------------
ALTER TABLE "public"."_ApprovedProjectUploads" ADD CONSTRAINT "_ApprovedProjectUploads_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."ApprovedProject" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."_ApprovedProjectUploads" ADD CONSTRAINT "_ApprovedProjectUploads_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Uploads" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table _BuildPlanUploads
-- ----------------------------
ALTER TABLE "public"."_BuildPlanUploads" ADD CONSTRAINT "_BuildPlanUploads_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."BuildPlan" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."_BuildPlanUploads" ADD CONSTRAINT "_BuildPlanUploads_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Uploads" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table _BuildingControlUploads
-- ----------------------------
ALTER TABLE "public"."_BuildingControlUploads" ADD CONSTRAINT "_BuildingControlUploads_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."BuildingControl" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."_BuildingControlUploads" ADD CONSTRAINT "_BuildingControlUploads_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Uploads" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table _MapUploads
-- ----------------------------
ALTER TABLE "public"."_MapUploads" ADD CONSTRAINT "_MapUploads_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Map" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."_MapUploads" ADD CONSTRAINT "_MapUploads_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Uploads" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table _PlanProjectUploads
-- ----------------------------
ALTER TABLE "public"."_PlanProjectUploads" ADD CONSTRAINT "_PlanProjectUploads_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."PlanProject" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."_PlanProjectUploads" ADD CONSTRAINT "_PlanProjectUploads_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Uploads" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table _RiskZoneUploads
-- ----------------------------
ALTER TABLE "public"."_RiskZoneUploads" ADD CONSTRAINT "_RiskZoneUploads_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."RiskZone" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."_RiskZoneUploads" ADD CONSTRAINT "_RiskZoneUploads_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Uploads" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table _ZoningPlanUploads
-- ----------------------------
ALTER TABLE "public"."_ZoningPlanUploads" ADD CONSTRAINT "_ZoningPlanUploads_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Uploads" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."_ZoningPlanUploads" ADD CONSTRAINT "_ZoningPlanUploads_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."ZoningPlan" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
