# -----------------------------
# Variables
# -----------------------------
variable "resource_group_name" {
  description = "Name of the Azure Resource Group"
  type        = string
  default     = "DevopsPipelinesRG"
}

variable "location" {
  description = "Azure region for all resources"
  type        = string
  default     = "East US"
}

variable "vm_name" {
  description = "Name of the virtual machine"
  type        = string
  default     = "devops-vm"
}

variable "vm_size" {
  description = "Size/SKU of the virtual machine"
  type        = string
  default     = "Standard_B2s"
}

variable "admin_username" {
  description = "Admin username for the VM"
  type        = string
  default     = "azureuser"
}

# On Windows, this default usually works if key exists there.
# Change to id_ed25519.pub if needed.
variable "ssh_public_key_path" {
  description = "Path to the SSH public key file"
  type        = string
  default     = "~/.ssh/id_rsa.pub"
}

# Restrict SSH source (recommended: your public IP/32).
# Example: "203.0.113.10/32"
variable "allowed_ssh_cidr" {
  description = "CIDR block allowed to SSH into the VM"
  type        = string
  default     = "*"
}
