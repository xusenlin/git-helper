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
	export class Log {
	    hash: string;
	    author: string;
	    committer: Signature;
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
	        this.committer = this.convertValues(source["committer"], Signature);
	        this.message = source["message"];
	        this.treeHash = source["treeHash"];
	        this.parentHashes = source["parentHashes"];
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
	    time: string;
	    commitHash: string;
	
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
	        this.commitHash = source["commitHash"];
	    }
	}

}

