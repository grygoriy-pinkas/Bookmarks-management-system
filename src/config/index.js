export function setLocalStorageValues() {
  localStorage.setItem("backgroundColor", "white");
  localStorage.setItem("fontSize", "Small");
  localStorage.setItem("zoom", "100%");
}

export const getDefaultValues = {
  backgroundColor: localStorage.getItem("backgroundColor", "white") || "white",
  fontSize: localStorage.getItem("fontSize", "Small") || "Small",
  zoom: localStorage.getItem("zoom", "100%") || "100%"
};

export const paginationDefaults = {
  PAGE_RANGE_DISPLAYED: 4,
  ITEMS_COUNT_PER_PAGE: 5,
  TOTAL_ITEMS_COUNT: undefined
};
