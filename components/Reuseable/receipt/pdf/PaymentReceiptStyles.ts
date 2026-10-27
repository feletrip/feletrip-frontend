import { StyleSheet } from "@react-pdf/renderer";

export const receiptStyles = StyleSheet.create({
    // Page Layout

    page: {
        padding: 24,
        fontSize: 10,
        fontFamily: "Helvetica",
        color: "#1f2937",
        backgroundColor: "#ffffff",
    },

    container: {
        padding: 14,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 12,
    },

    // Header
    headerContainer: {
        marginBottom: 10,
    },

    headerTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingBottom: 12,
        borderBottomWidth: 2,
        borderBottomColor: "#14b8a6",
    },

    brand: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#14b8a6",
    },

    brandWrapper: {
        flexDirection: "row",
        alignItems: "center",
    },

    brandLogo: {
        width: 38,
        height: 38,
        marginRight: 10,
        borderRadius: 19,
    },

    brandTextGroup: {
        flexDirection: "column",
        justifyContent: "center",
    },

    brandTitleRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    brandNamePrimary: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#0d9488",
    },

    brandNameSecondary: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#0f172a",
    },

    brandTagline: {
        marginTop: 2,
        fontSize: 8.5,
        color: "#64748b",
    },

    receiptTitle: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#0f172a",
    },

    receiptSubtitle: {
        marginTop: 2,
        fontSize: 8,
        color: "#94a3b8",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },

    receiptMeta: {
        alignItems: "flex-end",
    },

    metaContainer: {
        marginTop: 12,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    metaLabel: {
        marginBottom: 4,
        fontSize: 9,
        color: "#64748b",
    },

    metaValue: {
        fontSize: 11,
        fontWeight: "bold",
    },

    // Summary Card

    summaryCard: {
        marginTop: 10,
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderWidth: 1,
        borderRadius: 18,
        borderColor: "#5EEAD4",
        backgroundColor: "#F0FDFA",
    },

    statusBadge: {
        marginBottom: 14,
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderRadius: 999,
        backgroundColor: "#DCFCE7",
    },

    statusText: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#15803D",
        letterSpacing: 1.2,
    },

    summaryLabel: {
        marginBottom: 6,
        fontSize: 9,
        color: "#64748b",
    },

    summaryAmount: {
        marginBottom: 8,
        fontSize: 28,
        fontWeight: "bold",
        color: "#111827",
    },

    summaryDivider: {
        width: "100%",
        marginVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#D1FAE5",
    },

    summaryMeta: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },

    summaryMetaLabel: {
        marginBottom: 5,
        fontSize: 9,
        color: "#64748b",
        textAlign: "center",
    },

    summaryMetaValue: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#111827",
        textAlign: "center",
    },

    // Sections
    section: {
        marginTop: 12,
    },

    sectionTitle: {
        marginBottom: 6,
        fontSize: 11,
        fontWeight: "bold",
        color: "#0F766E",
        letterSpacing: 1,
        textTransform: "uppercase",
    },

    sectionCard: {
        marginTop: 6,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 14,
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
    },

    // Rows
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
    },

    lastRow: {
        borderBottomWidth: 0,
    },

    label: {
        fontSize: 10,
        color: "#64748b",
    },

    value: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#111827",
    },

    // Footer
    footer: {
        marginTop: 30,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: "#e5e7eb",
    },

    footerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    company: {
        fontWeight: "bold",
    },

    support: {
        color: "#64748b",
    },

    disclaimer: {
        marginTop: 10,
        fontSize: 8,
        color: "#94a3b8",
        textAlign: "center",
    },
});