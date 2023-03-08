import {repository} from "../../wailsjs/go/models"
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {DiffWorkStage,ShowWorkTreeFile} from "../../wailsjs/go/repository/Repository"

export enum DiffTypeEnum {
  "text",
  "img"
}

export type DiffStateType = {
  diffText: repository.DiffContent[]
  //diffImg
  diffType:DiffTypeEnum
  failedInfo:string|null
  fileStatus: repository.FileStatus|null
}


const initialState: DiffStateType = {
  diffText: [],
  diffType:DiffTypeEnum.text,
  failedInfo:null,
  fileStatus: null,
}

export const diffWorkTreeStageAsync = createAsyncThunk<DiffStateType,repository.FileStatus,{ rejectValue: DiffStateType }>(
    'diffWorkSlice/diffWorkTreeStage',
    async (fileStatus,{rejectWithValue}) => {
      try {
        if(fileStatus.worktree=="M"){
          const diffText = await DiffWorkStage(fileStatus.path);
          return {fileStatus,diffText,diffType:DiffTypeEnum.text,failedInfo:null}
        }else if (fileStatus.staging=="R") {
          const text = await ShowWorkTreeFile(fileStatus.path,1)
          return {fileStatus,diffText:text,diffType:DiffTypeEnum.text,failedInfo:null}
        }else if (fileStatus.staging=="A") {
          const text = await ShowWorkTreeFile(fileStatus.path,1)
          return {fileStatus,diffText:text,diffType:DiffTypeEnum.text,failedInfo:null}
        } else if (fileStatus.staging=="D"||fileStatus.worktree=="D") {
          return {fileStatus,diffText:[],diffType:DiffTypeEnum.text,failedInfo:"This file has been deleted."}
        }else if (fileStatus.staging=="?" && fileStatus.staging=="?") {
          return {fileStatus,diffText:[],diffType:DiffTypeEnum.text,failedInfo:"This file is not tracked by git."}
        }else {
          return {fileStatus,diffText:[],diffType:DiffTypeEnum.text,failedInfo:"Unprocessed file status."}
        }
      }catch (err){
        return rejectWithValue({fileStatus,diffText:[],diffType:DiffTypeEnum.text,failedInfo:JSON.stringify(err)});
      }
    }
);


const diffWorkSlice = createSlice({
  name: 'diffWorkSlice',
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: builder => {
    builder
        .addCase(diffWorkTreeStageAsync.fulfilled, (state, action) => {
          let { fileStatus,diffText,diffType,failedInfo } = action.payload
          state.fileStatus = fileStatus;
          state.diffText = diffText;
          state.diffType = diffType;
          state.failedInfo = failedInfo;
        })
        .addCase(diffWorkTreeStageAsync.rejected, (state, action) => {
          if(action.payload){
            let { fileStatus,diffType,failedInfo } = action.payload
            state.fileStatus = fileStatus;
            state.diffText = [];
            state.diffType = diffType;
            state.failedInfo = failedInfo;
          }else {
            state.fileStatus = null;
            state.diffText = [];
            state.failedInfo = action.error.message||"";
          }
        });
  },
});

export const diffWorkReducer = diffWorkSlice.reducer
export const {
  resetState
} = diffWorkSlice.actions
