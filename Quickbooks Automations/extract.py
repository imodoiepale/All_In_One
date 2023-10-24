from pyqb import QuickBooks


# Specify the path to the QWC file
qwc_file = './qb files/AGROLT SOLUTIONS PRIVATE LIMITED.QBW.TLG'

# Initialize QuickBooks object
qb = QuickBooks(qwc_file)

# Example: Retrieve customer list
customers = qb.CustomerQuery()
for customer in customers:
    print(customer.Name)
