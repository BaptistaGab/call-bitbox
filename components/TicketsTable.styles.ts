import styled from "styled-components";

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

export const Th = styled.th`
  text-align: left;
  padding: 12px;
  font-weight: 600;
  border-bottom: 1px solid #e5e7eb;
`;

export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #f1f5f9;
`;

export const Tr = styled.tr`
  &:hover {
    background-color: #f8fafc;
  }
`;

export const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: white;

  background-color: ${({ status }) => {
    switch (status) {
      case "OPEN":
        return "#2563eb";
      case "IN_PROGRESS":
        return "#f59e0b";
      case "WAITING":
        return "#9333ea";
      case "CLOSED":
        return "#16a34a";
      default:
        return "#64748b";
    }
  }};
`;
