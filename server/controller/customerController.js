import Customer from "../models/CustomerSchema.js";
import Stored from "../models/StoredSchema.js";

// Get all customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get one customer by ID
export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.json(customer);
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ error: "Failed to fetch customer" });
  }
};

export const createCustomer = async (req, res) => {
  const customer = new Customer({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    debts: req.body.debts || [],
    payments: req.body.payments || [],
    buyers: req.body.buyers || [],
    fromStore: Array.isArray(req.body.fromStore) ? req.body.fromStore : [],
  });

  try {
    // Decrease the quantity of Stored items
    if (Array.isArray(req.body.fromStore)) {
      for (const item of req.body.fromStore) {
        const storedItem = await Stored.findById(item.name);
        if (storedItem) {
          storedItem.quantity -= item.quantity;
          await storedItem.save();
        }
      }
    }

    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a customer
export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Decrease the quantity of Stored items based on new fromStore data
    if (Array.isArray(req.body.fromStore)) {
      for (const item of req.body.fromStore) {
        const storedItem = await Stored.findById(item.name);
        if (storedItem) {
          const existingItem = customer.fromStore.find(
            (i) => i.name.toString() === item.name
          );
          const quantityDifference = existingItem
            ? item.quantity - existingItem.quantity
            : item.quantity;
          storedItem.quantity -= quantityDifference;
          await storedItem.save();
        }
      }
    }

    // Update customer data
    Object.assign(customer, req.body);
    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ error: "Failed to update customer" });
  }
};

// Delete a customer
export const deleteCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const deletedCustomer = await Customer.findByIdAndDelete(customerId);
    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer:", error.message);
    res.status(500).json({ message: "Failed to delete customer" });
  }
};
