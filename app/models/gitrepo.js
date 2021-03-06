var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// if (path in this.paths) return 'real';
//   if (path in this.virtuals) return 'virtual';
//   if (path in this.nested) return 'nested';
//   if (path in this.subpaths) return 'real';



var gitRepoSchema = new Schema({
    
    "id": Number,
    "name": String,
    "search_name": String,
    "full_name": String,
    "viedo_num": Number,
    "question_num": Number,
    "owner": Schema.Types.Object,
    "private": Boolean,
    "html_url": String,
    "description": String,
    "fork": Boolean,
    "url": String,
    "forks_url": String,
    "keys_url": String,
    "collaborators_url": String,
    "teams_url": String,
    "hooks_url": String,
    "issue_events_url": String,
    "events_url": String,
    "assignees_url": String,
    "branches_url": String,
    "tags_url": String,
    "blobs_url": String,
    "git_tags_url": String,
    "git_refs_url": String,
    "trees_url": String,
    "statuses_url": String,
    "languages_url": String,
    "stargazers_url": String,
    "contributors_url": String,
    "subscribers_url": String,
    "subscription_url": String,
    "commits_url": String,
    "git_commits_url": String,
    "comments_url": String,
    "issue_comment_url": String,
    "contents_url": String,
    "compare_url": String,
    "merges_url": String,
    "archive_url": String,
    "downloads_url": String,
    "issues_url": String,
    "pulls_url": String,
    "milestones_url": String,
    "notifications_url": String,
    "labels_url": String,
    "releases_url": String,
    "created_at": String,
    "updated_at": String,
    "pushed_at": String,
    "git_url": String,
    "ssh_url": String,
    "clone_url": String,
    "svn_url": String,
    "size": Number,
    "stargazers_count": Number,
    "watchers_count": Number,
    "language": String,
    "has_issues": Boolean,
    "has_downloads": Boolean,
    "has_wiki": Boolean,
    "has_pages": Boolean,
    "forks_count": Number,
    "open_issues_count": Number,
    "forks": Number,
    "open_issues": Number,
    "watchers": Number,
    "default_branch": String,
    "score": Number
});


module.exports = mongoose.model('gitRepo', gitRepoSchema);