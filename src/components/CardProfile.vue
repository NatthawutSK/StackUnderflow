<script></script>
<template>
  <v-container>
    <v-card class="mx-auto" max-width="434" rounded="0">
      <v-img
        height="100%"
        cover
        src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
      >
        <v-avatar color="grey" size="150" rounded="0">
          <v-img
            cover
            src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
          ></v-img>
        </v-avatar>
        <v-list-item
          class="text-white"
          title="Marcus Obrien"
          subtitle="Network Engineer"
        ></v-list-item>
      </v-img>
    </v-card>
    <v-spacer></v-spacer>
    <v-main>
      <v-form>
        <v-card>
          <v-card-title class="text-h5 ma-3 px-5"> Edit Profile </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="First Name"
                  outlined
                  dense          
                  autocomplete="false"
                  class="mt-4"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Last Name"
                  outlined
                  dense
                  autocomplete="false"
                  class="mt-4"
                />
              </v-col>
            </v-row>
            <v-text-field
                  label="Username"
                  outlined
                  dense
                  autocomplete="false"
                  class="mt-4"
                />
                <v-text-field
                  label="Email"
                  outlined
                  dense
                  autocomplete="false"
                  class="mt-4"
                />
          </v-card-text>
          <v-card-action class="d-flex justify-center">
            <v-btn class="mb-5 w-50" color="primary">Save</v-btn>
          </v-card-action>
        </v-card>
      </v-form>
    </v-main>
  </v-container>
</template>
<script></script>
