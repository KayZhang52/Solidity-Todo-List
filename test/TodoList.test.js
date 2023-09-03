const TodoList = artifacts.require('./TodoList.sol')

contract('TodoList', (accounts)=>{
    before(async()=>{
        this.todoList = await TodoList.deployed()
    })
    it('deploys successfully', async()=>{
        const address = await this.todoList.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })

    it('lists tasks', async()=>{
        const taskCount = await this.todoList.taskCount()
        const task = await this.todoList.tasks(taskCount)

        assert.equal(task.id.toNumber(), taskCount.toNumber())
    })

    it('create tasks', async()=>{
        const result = await this.todoList.createTask('This is a new Task')
        const taskCount = await this.todoList.taskCount()
        assert.equal(taskCount,2)
        // create task emits an event that is a json with some information.
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), 2)
        assert.equal(event.completed, false)
    })

    it('toggle task', async()=>{
        const result = await this.todoList.toggleCompleted(1)
        const task = await this.todoList.tasks(1)
        assert.equal(task.completed, true);
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), 1)
        assert.equal(event.completed, true)
    })
})  