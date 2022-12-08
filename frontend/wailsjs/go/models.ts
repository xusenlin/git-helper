export namespace main {
	
	export class Branch {
	    hash: string;
	    name: string;
	    refName: string;
	
	    static createFrom(source: any = {}) {
	        return new Branch(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.hash = source["hash"];
	        this.name = source["name"];
	        this.refName = source["refName"];
	    }
	}
	export class Log {
	    hash: string;
	    author: string;
	    committer: string;
	    message: string;
	    treeHash: string;
	    parentHashes: string[];
	
	    static createFrom(source: any = {}) {
	        return new Log(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.hash = source["hash"];
	        this.author = source["author"];
	        this.committer = source["committer"];
	        this.message = source["message"];
	        this.treeHash = source["treeHash"];
	        this.parentHashes = source["parentHashes"];
	    }
	}
	export class Status {
	    file: string;
	    staging: string;
	    worktree: string;
	
	    static createFrom(source: any = {}) {
	        return new Status(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.file = source["file"];
	        this.staging = source["staging"];
	        this.worktree = source["worktree"];
	    }
	}
	export class Tag {
	    name: string;
	    refName: string;
	    type: number;
	    message: string;
	    hash: string;
	
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
	    }
	}

}

