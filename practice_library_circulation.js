
const circulationLogs = [
  {
    logId: "LOG001",
    studentCode: "SV001",
    bookIsbn: "ISBN001",
    status: "BORROWING",
    fineAmount: 0,
    overdueDays: 0,
    borrowDate: "2026-10-09",
    returnDate: null,
    fineSettled: false,
    completedDaysAgo: 0
  },
  {
    logId: "LOG002",
    studentCode: "SV002",
    bookIsbn: "ISBN002",
    status: "BORROWING",
    fineAmount: 0,
    overdueDays: 0,
    borrowDate: "2026-10-01",
    returnDate: null,
    fineSettled: false,
    completedDaysAgo: 0
  },
  {
    logId: "LOG003",
    studentCode: "SV003",
    bookIsbn: "ISBN003",
    status: "RETURNED",
    fineAmount: 15000,
    overdueDays: 3,
    borrowDate: "2026-09-20",
    returnDate: "2026-10-06",
    fineSettled: true,
    completedDaysAgo: 35
  }
];

const validStudents = ["SV001", "SV002", "SV003", "SV004"];

console.log("========== NHẬT KÝ BAN ĐẦU ==========");
console.table(circulationLogs);

console.log("========== 1. MƯỢN SÁCH MỚI ==========");

const newStudentCode = "SV004";
const newBookIsbn = "ISBN004";
const newLogId = "LOG004";

let studentValid = false;

for (let i = 0; i < validStudents.length; i++) {
  if (validStudents[i] === newStudentCode) {
    studentValid = true;
    break;
  }
}

if (studentValid) {
  circulationLogs.push({
    logId: newLogId,
    studentCode: newStudentCode,
    bookIsbn: newBookIsbn,
    status: "BORROWING",
    fineAmount: 0,
    overdueDays: 0,
    borrowDate: "2026-10-09",
    returnDate: null,
    fineSettled: false,
    completedDaysAgo: 0
  });

  console.log("Đã tạo giao dịch mượn sách:", newLogId);
} else {
  console.log("Mã sinh viên không hợp lệ.");
}

console.table(circulationLogs);

console.log("========== 2. GIA HẠN SÁCH ==========");

const extendLogId = "LOG001";
let extendFound = false;

for (let i = 0; i < circulationLogs.length; i++) {
  if (
    circulationLogs[i].logId === extendLogId &&
    circulationLogs[i].status === "BORROWING"
  ) {
    circulationLogs[i].extended = true;
    extendFound = true;
    console.log("Đã gia hạn giao dịch:", extendLogId);
    break;
  }
}

if (!extendFound) {
  console.log("Không tìm thấy giao dịch đang mượn để gia hạn.");
}

console.table(circulationLogs);

console.log("========== 3. TRẢ SÁCH VÀ TÍNH PHẠT ==========");

const returnLogId = "LOG002";
const returnCondition = "RETURNED";
const overdueDays = 4;

let returnFound = false;

for (let i = 0; i < circulationLogs.length; i++) {
  if (
    circulationLogs[i].logId === returnLogId &&
    circulationLogs[i].status === "BORROWING"
  ) {
    returnFound = true;
    circulationLogs[i].status = returnCondition;
    circulationLogs[i].returnDate = "2026-10-09";
    circulationLogs[i].overdueDays = overdueDays;

    if (returnCondition === "LOST") {
      circulationLogs[i].fineAmount = 200000;
    } else {
      circulationLogs[i].fineAmount = overdueDays * 5000;
    }

    circulationLogs[i].fineSettled = true;
    circulationLogs[i].completedDaysAgo = 0;

    console.log("Đã xử lý trả sách:", returnLogId);
    console.log(
      "Tiền phạt:",
      circulationLogs[i].fineAmount.toLocaleString("vi-VN"),
      "VNĐ"
    );

    break;
  }
}

if (!returnFound) {
  console.log("Không tìm thấy giao dịch đang mượn.");
}

console.table(circulationLogs);

console.log("========== 4. THANH LÝ NHẬT KÝ CŨ ==========");

for (let i = circulationLogs.length - 1; i >= 0; i--) {
  if (
    circulationLogs[i].status !== "BORROWING" &&
    circulationLogs[i].fineSettled === true &&
    circulationLogs[i].completedDaysAgo > 30
  ) {
    console.log("Đã xóa nhật ký:", circulationLogs[i].logId);
    circulationLogs.splice(i, 1);
  }
}

console.table(circulationLogs);

console.log("========== 5. BÁO CÁO CUỐI NGÀY ==========");

let borrowingCount = 0;
let totalFineCollected = 0;
let returnedCount = 0;
let lostCount = 0;

for (let i = 0; i < circulationLogs.length; i++) {
  if (circulationLogs[i].status === "BORROWING") {
    borrowingCount++;
  }

  if (
    circulationLogs[i].status === "RETURNED" &&
    circulationLogs[i].fineSettled === true
  ) {
    totalFineCollected += circulationLogs[i].fineAmount;
    returnedCount++;
  }

  if (
    circulationLogs[i].status === "LOST" &&
    circulationLogs[i].fineSettled === true
  ) {
    totalFineCollected += circulationLogs[i].fineAmount;
    lostCount++;
  }
}

console.log("+------------------------------------------+");
console.log("|       BAO CAO LUU CHUYEN THU VIEN        |");
console.log("+------------------------------------------+");
console.log("| Sách đang được mượn:", borrowingCount);
console.log("| Giao dịch đã trả:", returnedCount);
console.log("| Giao dịch mất sách:", lostCount);
console.log(
  "| Tổng tiền phạt đã thu:",
  totalFineCollected.toLocaleString("vi-VN"),
  "VNĐ"
);
console.log("| Số nhật ký còn lưu:", circulationLogs.length);
console.log("+------------------------------------------+");

console.log("CHI TIẾT NHẬT KÝ CUỐI NGÀY");
console.table(circulationLogs);
