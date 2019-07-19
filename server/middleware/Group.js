class Member {
    constructor() {
        this.email
        this.role
    }
}

module.exports = class Group {
    constructor() {
        this.groupID
        this.groupName
        this.groupMembers = []
        this.pendingMembers = []
        this.admin

        this.inviteMember = this.inviteMember.bind(this)
    }

    inviteMember(member) {
        this.pendingMembers.push(member)
    }

    addMember(member) {

        // if(member in pendingMembers)
        //this.groupMembers.push(email)

        // remove email from pendings
    }

    kickMember() // only by admin
    {
        // if admin
    }

    removeMember(member) // only by self
    {

    }




}