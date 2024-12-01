package main;

import model.FamilyTree;
import model.Person;
import java.util.Scanner;

public class CommandManager {
    private FamilyTree<Person> familyTree;
    private Scanner scanner;

    public CommandManager(FamilyTree<Person> familyTree) {
        this.familyTree = familyTree;
        this.scanner = new Scanner(System.in);
    }

    public void start() {
        while (true) {
            System.out.println("Введите команду (add, list, sortByName, sortByBirthYear, save, load, exit):");
            String command = scanner.nextLine();

            switch (command) {
                case "add":
                    addPerson();
                    break;
                case "list":
                    listPeople();
                    break;
                case "sortByName":
                    familyTree.sortByName();
                    listPeople();
                    break;
                case "sortByBirthYear":
                    familyTree.sortByBirthYear();
                    listPeople();
                    break;
                case "save":
                    // implement save logic  (See below for an example)
                    break;
                case "load":
                    // implement load logic (See below for an example)
                    break;
                case "exit":
                    return;
                default:
                    System.out.println("Неизвестная команда");
            }
        }
    }

    private void addPerson() {
        System.out.println("Введите имя:");
        String name = scanner.nextLine();
        System.out.println("Введите год рождения:");
        int birthYear = 0;
        try {
            birthYear = Integer.parseInt(scanner.nextLine());
        } catch (NumberFormatException e) {
            System.out.println("Неверный формат года рождения.");
            return; // Exit if invalid input
        }
        Person person = new Person(name, birthYear);
        familyTree.addMember(person);
        System.out.println("Человек добавлен в дерево.");
    }

    private void listPeople() {
        if (familyTree.isEmpty()) {
            System.out.println("Список пуст.");
            return;
        }
        for (Person person : familyTree) {
            System.out.println(person.getName() + ", родился в " + person.getBirthYear());
        }
    }


    //Example implementation of save and load (requires FileOperations)
    private void saveFamilyTree() {
        //Requires a FileOperations implementation and a file path
        //Example:
        //FileOperations<Person> fileOps = new FileOperationsImpl<>();
        //try {
        //    fileOps.saveToFile(familyTree, "familyTree.dat");
        //    System.out.println("Family tree saved to file.");
        //} catch (IOException e) {
        //    System.out.println("Ошибка сохранения: " + e.getMessage());
        //}
    }

    private void loadFamilyTree() {
        // Requires a FileOperations implementation and a file path
        //Example:
        //FileOperations<Person> fileOps = new FileOperationsImpl<>();
        //try {
        //    familyTree = fileOps.loadFromFile("familyTree.dat");
        //    System.out.println("Family tree loaded from file.");
        //} catch (IOException | ClassNotFoundException e) {
        //    System.out.println("Ошибка загрузки: " + e.getMessage());
        //}
    }
}
