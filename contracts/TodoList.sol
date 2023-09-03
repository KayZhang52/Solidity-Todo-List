pragma solidity ^0.5.0;

contract TodoList {
    /*
        public keyword makes var accessible from public with a auto reader function
     */
    uint public taskCount =0; //state variable, a variable that is written in the blockchain
    
    struct Task {
        uint id;
        string content;
        bool completed;
    }

    // defines a 'table' of columns id and task
    mapping(uint => Task) public tasks;
    
    // events can be triggered and emitted to subscribed users of the blockchain
    event TaskCreated(
        uint id,
        string content,
        bool completed
    );
    // constructor code are ran on deployment of smart contract
    constructor() public {
        createTask("Finish todolist dapp.");
    }

    // function for users to add task to blockchain
    function createTask(string memory _content) public {
        taskCount ++;
        tasks[taskCount] = Task(taskCount, _content, false);
        emit TaskCreated(taskCount, _content, false);
    }

}