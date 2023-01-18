export namespace repository {
	
	export class Branch {
	    hash: string;
	    name: string;
	    refName: string;
	    upstream: string;
	
	    static createFrom(source: any = {}) {
	        return new Branch(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.hash = source["hash"];
	        this.name = source["name"];
	        this.refName = source["refName"];
	        this.upstream = source["upstream"];
	    }
	}
	export class ChangesFile {
	    fileName: string;
	    index: number;
	    desc: string;
	
	    static createFrom(source: any = {}) {
	        return new ChangesFile(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.fileName = source["fileName"];
	        this.index = source["index"];
	        this.desc = source["desc"];
	    }
	}
	export class Signature {
	    name: string;
	    email: string;
	    when: string;
	
	    static createFrom(source: any = {}) {
	        return new Signature(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.email = source["email"];
	        this.when = source["when"];
	    }
	}
	export class Commit {
	    hash: string;
	    author: string;
	    committer: Signature;
	    message: string;
	    treeHash: string;
	    parentHashes: string;
	    unRemoteSync: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Commit(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.hash = source["hash"];
	        this.author = source["author"];
	        this.committer = this.convertValues(source["committer"], Signature);
	        this.message = source["message"];
	        this.treeHash = source["treeHash"];
	        this.parentHashes = source["parentHashes"];
	        this.unRemoteSync = source["unRemoteSync"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class DiffCommitInfo {
	    changesFiles: ChangesFile[];
	    statistics: string;
	
	    static createFrom(source: any = {}) {
	        return new DiffCommitInfo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.changesFiles = this.convertValues(source["changesFiles"], ChangesFile);
	        this.statistics = source["statistics"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class DiffContent {
	    content: string;
	    type: number;
	    index: number;
	
	    static createFrom(source: any = {}) {
	        return new DiffContent(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.content = source["content"];
	        this.type = source["type"];
	        this.index = source["index"];
	    }
	}
	export class FileStatus {
	    name: string;
	    path: string;
	    staging: string;
	    worktree: string;
	
	    static createFrom(source: any = {}) {
	        return new FileStatus(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.path = source["path"];
	        this.staging = source["staging"];
	        this.worktree = source["worktree"];
	    }
	}
	export class LogDesc {
	    tag: string[];
	    branch: string[];
	
	    static createFrom(source: any = {}) {
	        return new LogDesc(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.tag = source["tag"];
	        this.branch = source["branch"];
	    }
	}
	export class Log {
	    hash: string;
	    parentHashes: string[];
	    desc: LogDesc;
	    author: string;
	    message: string;
	
	    static createFrom(source: any = {}) {
	        return new Log(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.hash = source["hash"];
	        this.parentHashes = source["parentHashes"];
	        this.desc = this.convertValues(source["desc"], LogDesc);
	        this.author = source["author"];
	        this.message = source["message"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	export class MergeResult {
	    kind: number;
	    count: number;
	
	    static createFrom(source: any = {}) {
	        return new MergeResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.kind = source["kind"];
	        this.count = source["count"];
	    }
	}
	
	export class Tag {
	    name: string;
	    refName: string;
	    type: string;
	    message: string;
	    hash: string;
	    time: string;
	
	    static createFrom(source: any = {}) {
	        return new Tag(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.refName = source["refName"];
	        this.type = source["type"];
	        this.message = source["message"];
	        this.hash = source["hash"];
	        this.time = source["time"];
	    }
	}

}

