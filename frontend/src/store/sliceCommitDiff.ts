import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DiffCommit} from "../../wailsjs/go/repository/Repository"
import {repository} from "../../wailsjs/go/models"


export type DiffCommitState = {
  filesInfo: repository.ChangesFile[]
  statistics: string
  failedInfo:string|null
  commitId: string
}

const initialState: DiffCommitState = {
  filesInfo:[],
  statistics: "",
  failedInfo:null,
  commitId: ""
}

export const diffCommitAsync = createAsyncThunk<DiffCommitState,{commitId:string,commitId2:string},{ rejectValue: DiffCommitState }>(
    'diffCommitSlice/diffCommit',
    async (arg,{rejectWithValue}) => {
      try {
        const r = await DiffCommit(arg.commitId,arg.commitId2)
        return {filesInfo:r.changesFiles||[], statistics: r.statistics, failedInfo:null, commitId:arg.commitId}
      }catch (err){
        return rejectWithValue({filesInfo:[], statistics: "", failedInfo:JSON.stringify(err), commitId:arg.commitId})
      }

})

const diffCommitSlice = createSlice({
  name: 'diffCommitSlice',
  initialState,
  reducers: {
    //删除全部使用的地方，通过订阅变动
    resetState: () => initialState,
  },
  extraReducers: builder => {
    builder
        .addCase(diffCommitAsync.fulfilled, (state, action) => {
          let { statistics,failedInfo,filesInfo,commitId } = action.payload
          state.statistics =  statistics
          state.failedInfo =  failedInfo
          state.filesInfo =  filesInfo
          state.commitId = commitId
          // state =  action.payload
        })
        .addCase(diffCommitAsync.rejected, (state, action) => {
          if(action.payload){
            let { statistics,failedInfo,filesInfo,commitId } = action.payload
            state.statistics =  statistics
            state.failedInfo =  failedInfo
            state.filesInfo =  filesInfo
            state.commitId = commitId
            // state =  action.payload
          }else {
            state.failedInfo = action.error.message||"";
          }
        });
  },
});

export const diffCommitReducer = diffCommitSlice.reducer
export const {
  resetState
} = diffCommitSlice.actions
