import { createSlice, PayloadAction } from "@reduxjs/toolkit"
export type ColumnGroup = "new" | "final" | "migrated"
interface UIState { activeGroup: ColumnGroup; modalTokenId?: string | null }
const initialState: UIState = { activeGroup: "new", modalTokenId: null }
const ui = createSlice({
  name: "ui", initialState,
  reducers: {
    setActiveGroup(state, action: PayloadAction<ColumnGroup>) { state.activeGroup = action.payload },
    openTokenModal(state, action: PayloadAction<string>) { state.modalTokenId = action.payload },
    closeTokenModal(state) { state.modalTokenId = null }
  }
})
export const { setActiveGroup, openTokenModal, closeTokenModal } = ui.actions
export default ui.reducer
